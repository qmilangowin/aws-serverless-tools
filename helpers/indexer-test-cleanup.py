#!/usr/bin/python
import os
import sys


def cleanup(args1, args2=None):

        os.system("rm -rf ~/repos/oxpecker-indexlet/scripts/logs/*.log")
        os.system('rm -rf ~/repos/oxpecker-indexlet/scripts/config/*.json')
        os.system("sudo rm -rf ~/repos/oxpecker-indexlet/scripts/output/SymbolOutput/test/"+args2)


def list(args1, args2=None):

        print("*****************Displaying Logs Directory*****************\n")
        os.system('ls '+args1+' ~/repos/oxpecker-indexlet/scripts/logs/*.log')
        print("\n*****************Displaying Config Directory*****************\n")
        os.system('ls '+args1+' ~/repos/oxpecker-indexlet/scripts/config/*.json')
        print("\n*****************Displaying Output Directory*****************\n")
        os.system('ls '+args1+' ~/repos/oxpecker-indexlet/scripts/output/SymbolOutput/test/'+args2)


def main():


        try:
                args1=str(sys.argv[1])

                if (args1=='-h') or (args1=="-help"):
                        print("\nUsage:")
                        print("\tpython indexer-test-cleanup.py -l <file-set-name> or -list <file-set-name>: lists the contents of relevants directories")
                        print("\tpython indexer-test-cleanup.py -d <file-set-name> or -delete <file-set-name>: Deletes logs, config and output files")
                        print("\tchmod+x indexer-test-cleanup.py and then you can run it as executable")
                elif (args1 == '-l') or (args1=='-list'):
                        args2=str(sys.argv[2])
                        list(args1, args2)
                elif (args1 == '-d') or (args1=='-delete'):
                        args2=str(sys.argv[2])
                        confirm = raw_input("Are you sure you want to delete logs, config and output files? \nEnter <y/yes> to continue, any other key to quit without deleting the files \n")
                        if (confirm == "y") or (confirm == "yes"):
                                print("Deleting ...")
                                cleanup(args1, args2)
                        else:
                                print("Exiting ...")
                                return
                else:
                        raise IndexError

        except IndexError:
                print("type: indexer-test-cleanup.py  -h or indexer-test-cleanup.py -help for more info")

if __name__=="__main__":
        main()



