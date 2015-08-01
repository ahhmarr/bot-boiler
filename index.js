var http=require('http');
var fs=require('fs');
var url=require('url');
var queryString=require('querystring');
var API_KEY='96366334:AAECwPjrzHpF7k6wIn0r7PXQyYWNpq8wJZI';
http.createServer(function(req,res)
{
	var raw = '';
	var json={};
	req.on('data', function(d) {
	  raw += d; 
	});
	req.on('end', function() {
	  res.writeHead(200, {'Content-Type': 'text/plain'});
	  if(raw)
	  {
	  	json=JSON.parse(raw);
	  	console.log(parser(json,function(command,text)
	  	{
	  		sendMessage('received the text');
	  	}));
	  }
	  res.end(raw);   
	});
	 
}).listen(8181);

var parser=function(json,callback)
{
	var command='';
	var text='';
	if(!json.message)
		return;
	text=json.message.text;
	text=text.replace(/^[ ]+/,'');
	if(text.match(/^\//)){
		//has command
		command=text.split(' ')[0];
		text=text.replace(command,'');
	}

	var params= {
		command : command,
		text	: text
	};
	if(!callback)
		return params;
	callback(params.command,params.text);
};
var tasker=function(command,text)
{
	
};
var sendMessage=function(msg)
{
	reactor('sendMessage',msg);
};
var reactor=function(method,queryString)
{
	if(!method)
		return;
	queryString=(!queryString.match(/^\?/))?'?'+queryString:queryString;
	options={
		host : 'https://api.telegram.org/',
		path : ['/bot',API_KEY,'/',method,queryString].join()
	};
	var req=http.request(options,function(res)
	{
		
	});
	req.on('error',function(e)
	{
		console.log('problem with request '+e.message);
	});
};
