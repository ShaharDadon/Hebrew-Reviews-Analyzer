package weka.api;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;

import weka.classifiers.Classifier;
import weka.core.Instances;



import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;


public class HelloWeka {

    public static void main(String[] args) throws Exception {
    	
    		Classifier myCls = (Classifier) weka.core.SerializationHelper.read("C:/Users/moti/Desktop/Bayes-NaiveBayes.model");
            //Classifier myCls = new J48();
            Instances train = new Instances(new BufferedReader(new FileReader("C:/Users/moti/Desktop/train.arff")));
            int lastIndex = train.numAttributes() - 1;
            
            train.setClassIndex(lastIndex);
            
            Instances test = new Instances(new BufferedReader(new FileReader("C:/Users/moti/Desktop/test1.arff")));
            
            test.setClassIndex(lastIndex);
            myCls.buildClassifier(train);
            
        /*    for(int i=0; i<test.numInstances(); i++) {
            
                    double index = myCls.classifyInstance(test.instance(i));
                    String className = train.attribute(lastIndex).value((int)index);
                    System.out.println(className);
            }*/
            
            
            double index = myCls.classifyInstance(test.instance(test.numInstances()-1));
            String className = train.attribute(lastIndex).value((int)index);
            System.out.println(className);
    }
}