/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

import React from 'react';

module.exports = {
  add:<path  d="M13.8 13.4h7.7c.3 0 .7-.3.7-.7v-1.4c0-.4-.4-.7-.7-.7h-7.7c-.2 0-.4-.2-.4-.4V2.5c0-.3-.3-.7-.7-.7h-1.4c-.4 0-.7.4-.7.7v7.7c0 .2-.2.4-.4.4H2.5c-.3 0-.7.3-.7.7v1.4c0 .4.4.7.7.7h7.7c.2 0 .4.2.4.4v7.7c0 .3.3.7.7.7h1.4c.4 0 .7-.4.7-.7v-7.7c0-.2.2-.4.4-.4z"/>,
  adduser:<path  d="M10.1 17.1c0-1.3.4-2.7 1.1-3.8.8-1.4 1.6-1.9 2.3-3 1.2-1.7 1.4-4.1.7-6-.8-1.9-2.5-3-4.6-2.9S6 2.7 5.3 4.6c-.7 2-.4 4.5 1.3 6.1.6.7 1.3 1.7.9 2.6-.3 1-1.4 1.4-2.2 1.7-1.8.8-4 1.9-4.3 4.1-.4 1.7.8 3.5 2.7 3.5h7.8c.4 0 .6-.4.4-.7-1.1-1.4-1.8-3.1-1.8-4.8zm7.4-5.6c-3.1 0-5.5 2.5-5.5 5.6s2.4 5.5 5.5 5.5 5.5-2.5 5.5-5.5-2.5-5.6-5.5-5.6zm2.8 6c0 .3-.2.5-.5.5h-1.3v1.4c0 .3-.3.4-.5.4h-1c-.2 0-.4-.1-.4-.4V18h-1.4c-.3 0-.4-.2-.4-.5v-.9c0-.3.1-.4.4-.4h1.4v-1.4c0-.3.2-.5.4-.5h1c.2 0 .5.2.5.5v1.4h1.3c.3 0 .5.1.5.4v.9z" />,
  announcement:<path  d="M10.5 21l-.6-.5c-.7-.5-.7-1.4-.7-1.9v-1.3c0-.4-.3-.7-.7-.7H5.8c-.4 0-.7.3-.7.7v3.6c0 1.2.7 2.2 1.9 2.2h2.2c1.4 0 1.5-.9 1.5-.9s.2-.9-.2-1.2zM20.8 8.3V2c0-1.1-1.4-1.4-2.2-.7l-4.1 3.9c-.6.5-1.4.8-2.3.8h-7C2.8 6 .9 8.1.9 10.5v.1c0 2.4 1.9 4.2 4.3 4.2h7c.9 0 1.7.3 2.4.9l4 4c.8.7 2.2.4 2.2-.7v-6.3c1.4 0 2.2-.9 2.2-2.2 0-1.2-.8-2.2-2.2-2.2z" />,
  apps:<path  d="M6 1.8H3.2c-.8 0-1.4.6-1.4 1.4V6c0 .8.6 1.4 1.4 1.4H6c.8 0 1.4-.6 1.4-1.4V3.2c0-.8-.6-1.4-1.4-1.4zm0 14.8H3.2c-.8 0-1.4.6-1.4 1.4v2.8c0 .8.6 1.4 1.4 1.4H6c.8 0 1.4-.6 1.4-1.4V18c0-.8-.6-1.4-1.4-1.4zm0-7.4H3.2c-.8 0-1.4.6-1.4 1.4v2.8c0 .8.6 1.4 1.4 1.4H6c.8 0 1.4-.6 1.4-1.4v-2.8c0-.8-.6-1.4-1.4-1.4zm7.4-7.4h-2.8c-.8 0-1.4.6-1.4 1.4V6c0 .8.6 1.4 1.4 1.4h2.8c.8 0 1.4-.6 1.4-1.4V3.2c0-.8-.6-1.4-1.4-1.4zm0 14.8h-2.8c-.8 0-1.4.6-1.4 1.4v2.8c0 .8.6 1.4 1.4 1.4h2.8c.8 0 1.4-.6 1.4-1.4V18c0-.8-.6-1.4-1.4-1.4zm0-7.4h-2.8c-.8 0-1.4.6-1.4 1.4v2.8c0 .8.6 1.4 1.4 1.4h2.8c.8 0 1.4-.6 1.4-1.4v-2.8c0-.8-.6-1.4-1.4-1.4zm7.4-7.4H18c-.8 0-1.4.6-1.4 1.4V6c0 .8.6 1.4 1.4 1.4h2.8c.8 0 1.4-.6 1.4-1.4V3.2c0-.8-.6-1.4-1.4-1.4zm0 14.8H18c-.8 0-1.4.6-1.4 1.4v2.8c0 .8.6 1.4 1.4 1.4h2.8c.8 0 1.4-.6 1.4-1.4V18c0-.8-.6-1.4-1.4-1.4zm0-7.4H18c-.8 0-1.4.6-1.4 1.4v2.8c0 .8.6 1.4 1.4 1.4h2.8c.8 0 1.4-.6 1.4-1.4v-2.8c0-.8-.6-1.4-1.4-1.4z"/>,
  arrowdown:<path  d="M4.4 14.3c-.3.4-.3.9 0 1.3l7 6.7c.3.4.9.4 1.2 0l7-6.7c.4-.4.4-.9 0-1.3l-1.3-1.2c-.3-.4-.9-.4-1.3 0l-2.1 2.1c-.4.4-1.1.1-1.1-.4V2.3c0-.5-.4-.9-.9-.9h-1.8c-.5 0-.9.5-.9.9v12.5c0 .5-.7.8-1.1.4L7 13.1c-.4-.4-1-.4-1.3 0l-1.3 1.2z"/>
};