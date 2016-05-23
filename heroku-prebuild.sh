#!/usr/bin/env bash

# Copyright (c) 2015, Salesforce.com, inc. All rights reserved.
#
# Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
# Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
# Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
# Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

echo "# Setup for Heroku"

if [ "$GIT_SSH_KEY" != "" ]; then
	echo "## Detected SSH key for git. Launching ssh-agent and loading key"
	echo $GIT_SSH_KEY | base64 --decode > id_rsa
	# launch ssh-agent, we'll use it to serve our ssh key
	eval `ssh-agent -s`
	# We're not supporting passphrases at this time.  We could pull that in
	# from config as well, but then we'd have to setup expect or some other
	# terminal automation tool to feed it into ssh-add.
	ssh-add id_rsa
	rm id_rsa
	# Add github to the list of known hosts - ignore the warning or else set -e will abort the deployment
	ssh -oStrictHostKeyChecking=no -T git@github.com || true

	npm install --unsafe-perm --production

	export GIT_SSH_KEY=0
fi
