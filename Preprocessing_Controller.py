# -*- coding: utf-8 -*-
import pymongo as pym
import logging
from datetime import datetime

class DbConnector:
    def __init__(self):
        self.mongoClient = pym.MongoClient('85.25.195.221', 27017)
        self.mongoClient.db.authenticate('mongoadmin', 'MisterSmith117', source='admin')
        
        capturingDb = self.mongoClient.CapturingDB
        logging.debug('Connected to CapturingDB!')
        self.networkCapturing = capturingDb['network']
        self.networkPreprocessed = capturingDb['NetworkActivity']
        self.psCapturing = capturingDb['ps']
        self.psPreprocessed = capturingDb['ps_preprocessed']
        
    def closeConnection(self):
        logging.debug('Closing connection to MongoDB...')
        self.mongoClient.close()
        
class NetworkPreprocessor:
    def __init__(self, db_network, db_networkPreprocessed):
        self.db_networkPreprocessed = db_networkPreprocessed
        self.db_network = db_network
        try:
            self.last_processed_id = last_processed_id = self.db_networkPreprocessed.find().sort('_id', -1).limit(1).next()['_id']
            logging.debug('Continuing network data preprocessing after document_id `' + str(last_processed_id) + '`...')
        except StopIteration:
            self.last_processed_id = 0
            logging.debug('Starting new network data pre-processing run...')
    
    def select_tcp(self, pcap, target):
        try:
            target['src_port'] = pcap['_source']['layers']['tcp']['tcp.srcport']
            target['dst_port'] = pcap['_source']['layers']['tcp']['tcp.dstport']
            target['length'] = pcap['_source']['layers']['tcp']['tcp.len']
            target['protocol'] = 'tcp'
            return target
        except KeyError:
            return target

    def select_udp(self, pcap, target):
        try:
            target['src_port'] = pcap['_source']['layers']['udp']['udp.srcport']
            target['dst_port'] = pcap['_source']['layers']['udp']['udp.dstport']
            target['length'] = pcap['_source']['layers']['udp']['udp.length']
            target['protocol'] = 'udp'
            return target
        except KeyError:
            return target
    
    def insert_processed_doc_into_db(self, doc):
        timestamp = datetime.fromtimestamp(doc['timestamp']/1000.0)
        if not self.db_networkPreprocessed.find_one({'_id': doc['_id']}):
            logging.debug('Inserting `' + str(doc['_id'])  + '` (' + str(timestamp) + ') ...')
            self.db_networkPreprocessed.insert_one(doc)
        else:
            logging.debug('Skipping `' + str(doc['_id']) + '`!')
            
    def process_single_doc(self, original_doc):
        target_doc = {}
        target_doc['_id'] = original_doc['_id']
        target_doc['timestamp'] = int(float(original_doc['_source']['layers']['frame']['frame.time_epoch'])*1000)
        target_doc['src_ip'] = original_doc['_source']['layers']['ip']['ip.src']
        target_doc['dst_ip'] = original_doc['_source']['layers']['ip']['ip.dst']
        self.select_tcp(original_doc, target_doc)
        self.select_udp(original_doc, target_doc)
        self.insert_processed_doc_into_db(target_doc)
        
    def process_doc_list(self, doc_list):
        for pcap_doc in doc_list:
            try:
                self.process_single_doc(pcap_doc)
            except KeyError:
                continue
        logging.debug('Finished network data preprocessing')
        
    def network_preprocessing(self):
        if self.last_processed_id != 0:
            self.process_doc_list(self.db_network.find({'_id': {'$gt': self.last_processed_id}}).batch_size(1000))
        else:
            self.process_doc_list(self.db_network.find().batch_size(1000))

if __name__ == "__main__":
    logging.basicConfig(format='%(asctime)s (%(levelname)s): %(message)s', datefmt='%d/%m/%Y %I:%M:%S %p', level=logging.DEBUG)
    db = DbConnector()
    network_preprocessor = NetworkPreprocessor(db_network=db.networkCapturing, db_networkPreprocessed=db.networkPreprocessed)
    network_preprocessor.network_preprocessing()
    db.closeConnection()
