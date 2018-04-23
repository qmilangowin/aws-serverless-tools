#!/usr/bin/env python

logArray=[]

def getWorkerCount():

	try:
		for line in open("/home/ubuntu/seql_service.log","r"):
			if "Number of workers" in line:
				logArray.append(line)
	except IOError:
		print("Could not open log file")
		return

	try:
		count=logArray[-1]
	except IndexError:
		print("No workers registered")
		return
	count=logArray.pop()
	count=count.split(" ")
	count=int(count.pop());
	return count

def main():
	workerCount = getWorkerCount()
	print(workerCount)



if __name__ == "__main__":
	main()
