import xml.etree.ElementTree as ET
import io

def preprocess():
    
    root = ET.parse("MorphAnalyzer/morphAnalyzer-output.xml")
    article = root.find("article")
    par = article.find("paragraph")
    sentence = par.find("sentence")
    tokens = sentence.findall("token")
    review = ''
    index=0
    
    with io.open("TextFiles/stopwords.txt", "r",encoding='utf-8') as myfile:
        stoplines = myfile.read().splitlines()
    
    for token in tokens :
        if token.attrib['surface'] not in stoplines:
            analysis = token.find("analysis")
            if analysis is not None:
                
                base = analysis.find("base")
                
                if base is not None:
                    
                    if 'lexiconItem' in base.attrib:
                        root = base.attrib['lexiconItem']
                        spells = base.iter('verb')
                        for n in spells:
                            root = n.attrib['root']
                        
                            break
                        review +=' '+root
                        index+=1
        #else : print(token.attrib['surface'])
    saveReview(review)
    
def saveReview(text):
    
    with io.open("TextFiles/tested-line.txt", "w",encoding='utf-8') as myfile:
        myfile.write(text)
        #print(review)
preprocess()
