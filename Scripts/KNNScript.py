#!/usr/bin/env python
# -*- coding: utf-8 -*-
#poslines = open ("Positive.txt",'r').read().splitlines()
from math import log
from random import shuffle
import sys
import io

with io.open("TextFiles/Pos_stemmed.txt", "r",encoding='utf-8') as myfile:
        poslines = myfile.read().splitlines()
with io.open("TextFiles/Neg_stemmed.txt", "r",encoding='utf-8') as myfile:
        neglines = myfile.read().splitlines()
with io.open("TextFiles/tested-line.txt", "r",encoding='utf-8') as myfile:
        tested = myfile.read().splitlines()

reload(sys)  
sys.setdefaultencoding('utf8')


shuffle(poslines)
shuffle(neglines)

poslinesTrain = poslines[:len(poslines)-1]
neglinesTrain = neglines[:len(neglines)-1]


trainset = [(x,1) for x in poslinesTrain] + [(x,-1) for x in neglinesTrain] 

tested = [(tested[0],0)]

#tested = [(sys.argv[1:][0].decode('utf8','ignore'),0)]


poswords={}
negwords={}


def getWords(text):
    w = text.split()
    w = w+[w[i]+' '+w[i+1] for i in range(len(w)-1)]  # N-Grams
    w = list(set(w))
    return w


freq = {}
trainfeatures = []

for line, label in trainset:
    words = getWords(line)
    for word in words:
        freq[word] = freq.get(word,0)+1
    trainfeatures.append((words, label))
    
TrainSetSize = len(trainset)

wrong = 0
for line, label in tested:
    testwords = getWords(line)
    results = []
    for i ,(trainwords, trainlabel) in enumerate (trainfeatures):
        
        commonwords = [x for x in trainwords if x in testwords]
        score = 0.0
        for word in commonwords:
            score += log(TrainSetSize/freq[word])
        results.append((score,trainlabel))
    results.sort(reverse=True)
    topMatches = [x[1] for x in results[:5]]
    posMatch = topMatches.count(1)
    negMatch = topMatches.count(-1)
    prediction = 1
    if negMatch > posMatch : prediction =0
    print( prediction)
    

    
