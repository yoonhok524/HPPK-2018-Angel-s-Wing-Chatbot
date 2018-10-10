/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START gae_node_request_example]
const express = require('express');

const bodyParser = require('body-parser');
const Bot = require('./bot.js')
const bot = new Bot('hppk-2018-angel-s-wing', './hppk-2018-angel-s-wing-1437cfdf5b05.json')

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]


const buttons = {
	type: 'buttons',
	buttons: [
	'물품 등록',
	'물품 조회'
	]
}

app.get('/keyboard', function(req, res) {
	res.json(buttons)
});


app.post('/message', function(req, res){
	const msg = req.body.content;
	const id = req.body.user_key
	
	bot.sendToDialogflow(msg, id).then(result => {
		res.send({
			message: {
				text: result[0].queryResult.fulfillmentText
			}
		})
	}).catch(e => {
		res.send({
			message: {
				text: 'Dialogflow Error!'
			}
		})
	})
})