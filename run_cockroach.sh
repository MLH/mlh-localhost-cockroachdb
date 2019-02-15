### This file handles the cockroachdb provisioning and configuration.
### We'll rerun it continuously, so try to keep its items idempotent and speedy-enough.


sh ~/install_cockroachdb.sh

# setup an alias for easy command execution
alias cockroach="~/.data/cockroach"

# remove the preexisting environment so that we run fresh.
# (this deletes all the DB data, so we can repeat our assorted creation scripts.)
cockroach quit --insecure
rm -rf hello*

### Now, onward to start up the cluster!
### https://www.cockroachlabs.com/docs/build-a-nodejs-app-with-cockroachdb.html


# Start node 1:
cockroach start --insecure \
--store=hello-1 \
--host=localhost \
--background

# Start node 2:
cockroach start --insecure \
--store=mlh-node2 \
--host=localhost \
--port=26258 \
--http-port=8081 \
--join=localhost:26257 \
--background

# # Start node 3:
# cockroach start --insecure \
# --store=mlh-node3 \
# --host=localhost \
# --port=26259 \
# --http-port=8082 \
# --join=localhost:26257 \
# --background


# Create a user (optional for this exercise)
# cockroach user set maxroach --insecure

# Create DB and priviledges
cockroach gen example-data startrek | cockroach sql --insecure

# Check on the nodes
cockroach node ls --insecure

# Glitch will run this script in a loop, 
# so sleep for a bit to stablize the refresh rate of the site.
# This could be upgraded by monitoring the cockroach processes instead.
sleep 1m
