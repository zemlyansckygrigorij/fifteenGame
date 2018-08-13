// Base settings
isDOM = document.getElementById; //DOM1 browser (MSIE 5+, Netscape 6, Opera 5+)
isOpera = isOpera5 = window.opera && isDOM; //Opera 5+
isOpera6 = isOpera && window.print; //Opera 6+
isOpera7 = isOpera && document.readyState; //Opera 7+
isMSIE = document.all && document.all.item && !isOpera; //Microsoft Internet Explorer 4+
isMSIE5 = isDOM && isMSIE; //MSIE 5+
isNetscape4 = document.layers; //Netscape 4.*
isMozilla = isDOM && navigator.appName == "Netscape"; //Mozilla или Netscape 6.*

var xmlReg = null;
var userAgent = { };
userAgent.isAJAX  = (createXMLHttpRequest()?true:false);
userAgent.isMozilla  = (navigator.userAgent.match(/\bGecko\b/));
userAgent.isOpera  = (navigator.userAgent.match(/\bOpera\b/));
userAgent.isInternetExplorer  = (navigator.userAgent.match(/\bMSIE\b/) && !userAgent.isOpera);

// Call server
function callServer(method, url, data, dataType, func, arg) {
	if (!method) method='GET';
	xmlReq = createXMLHttpRequest();
	if(xmlReq) {
		xmlReq.open(method, url, true);
		xmlReq.onreadystatechange = function() {
			// only if xmlReq shows "loaded"
			if (xmlReq.readyState == 4) {
				func(arg, xmlReq.responseText,  xmlReq.responseXML, xmlReq.status, xmlReq.statusText);
			}
		};
		if (data) {
			if (!dataType) dataType='application/xml';
			if (typeof(data)!="string" && dataType.indexOf("charset=")<0
				&& userAgent.isMozilla) dataType=dataType+';charset=utf-8';
			// in Mozilla XML always serialized as UTF-8
			xmlReq.setRequestHeader('Content-Type', dataType);
		}
		xmlReq.send(data);
		return false;
	}
	return true;
}

function createXMLHttpRequest() {
	var xmlReq = false;
	// branch for native XMLHttpRequest object
	if(window.XMLHttpRequest) {
		try {
			xmlReq = new XMLHttpRequest();
		} catch(e) {
			xmlReq = false;
	}
	// branch for IE/Windows ActiveX version
	} else if(window.ActiveXObject) {
		try {
			xmlReq = new  ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try {
				xmlReq = new  ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {
				xmlReq = false;
			}
		}
	}
	return xmlReq;
}

function openGameVariants(prefix, id, limit)
{
	for (var i = 0; i < limit; i++)
	{
		if (document.getElementById(prefix + "_header_" + i))
		{
			if (i == id)
			{
				document.getElementById(prefix + "_variants_" + i).style.display = "inline";
				document.getElementById(prefix + "_header_" + i).style.fontWeight = "bold";
			}
			else
			{
				document.getElementById(prefix + "_variants_" + i).style.display = "none";
				document.getElementById(prefix + "_header_" + i).style.fontWeight = "normal";
			}
		}
	}
}


function getOffsetSum(elem) 
{
	var top=0, left=0;
	while(elem) 
	{
	    top = top + parseFloat(elem.offsetTop);
	    left = left + parseFloat(elem.offsetLeft);
	    elem = elem.offsetParent;  
	}
    return Array(Math.round(left), Math.round(top));
}

