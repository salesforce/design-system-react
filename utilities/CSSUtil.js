define(['module'], function (module) {
    /*
    Copyright (c) 2015, salesforce.com, inc. All rights reserved.
    
    Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
    Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
    
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    */

    'use strict';

    var addCSSRule = function addCSSRule(sheet, selector, rules, index) {
        console.log('selector: ', selector);
        console.log('rules: ', rules);
        if ('insertRule' in sheet) {
            console.log('insertRule: ');
            sheet.insertRule(selector + '{ ' + rules + ' }', index);
        } else if ('addRule' in sheet) {
            console.log('addRule: ');
            sheet.addRule(selector, rules.join(';'), index);
        }
    };

    module.exports = {
        load: function load(cssClasses) {
            var sheet = function () {
                var style = document.createElement("style");
                style.appendChild(document.createTextNode(""));
                document.head.appendChild(style);
                return style.sheet;
            }();
            cssClasses.forEach(function (cssClass) {
                var selector = cssClass.selector;
                var rules = cssClass.rules;
                addCSSRule(sheet, selector, rules.join(';'), 0);

                //            rules.forEach((rule)=>{
                //                addCSSRule(sheet,selector,rule, 0);
                //            });
            });
        }
    };
});