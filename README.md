Startrek Quotes with CockroachDB
================================

Quotes are queried from CockroachDB and displayed every few seconds.  
![preview](https://i.imgur.com/TiGjKH8.png)

Project on Glitch
=================

Project can be found on Glitch at [https://checker-aries.glitch.me/](https://checker-aries.glitch.me)

Troubleshooting
===============

**Note:** if you open a Glitch console and `cockroach` is installed, the `cockroach` command will still not be found until you run `alias cockroach="~/.data/cockroach"`

### Troubleshooting `BRB! Connecting to CockroachDB`

This happens occassionally when the project has been running for a while. It may go to sleep. Simply reload the page and wait a few minutes while the project wakes up and restarts the DB process.

If the app is really unresponsive, you may also go into the Glitch Console and type `sh cockroach.sh` to run the cockroachDB process manually. Hit `enter` to execute the DB process. You should see a bunch of output on the Glitch console.

### App is still not responding and `EADDRINUSE :::3000` appears in the Glitch Log

You have no choice but to kill the server.js process in the Glitch Console.
![error](https://i.imgur.com/nzQsauv.png)

* Go to the Glitch Console
* Type `ps -ax` to see a list of all running processes.
* Find the process `node server.js` and note the PID.
* Finally, kill that process by running `kill [PID]`

![kill](https://i.imgur.com/0u8U6qS.png)
  
Don't worry about restarting the node server.js as Glitch will do this automatically. You may return to your project on Glitch IDE and check the log to ensure you have no issues.

### Error: `bash: cockroach: command not found`

If you attempt to enter one of the commands beginning with `cockroach` and get the error above, enter this in your terminal: 

`alias cockroach="~/.data/cockroach"` then 

`cockroach version`. If you see this: 

```
Build Tag:    v2.0.3
Build Time:   2018/06/18 16:11:33
Distribution: CCL
Platform:     linux amd64 (x86_64-unknown-linux-gnu)
Go Version:   go1.10
C Compiler:   gcc 6.3.0
Build SHA-1:  91715a9a95edbe716912173204fa4c0fc6724457
Build Type:   release
```

you have fixed the error. 

### See CockroachDB information instead of the app

If someone sees information about `cockroachdb` instead of the quotes interface, they probably started the database incorrectly somehow. Quit the database using `cockroach quit --insecure --port=26257` (or whatever port number is required) and start it again.

### Running out of space

This only occured once during testing, but sometimes CockroachDB can run out of space on Glitch. In this case, remove the files `cockroach-data`, `mlh-node1` and `mlh-node2`. Then restart and refill the databases.
