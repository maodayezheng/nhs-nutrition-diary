



<!DOCTYPE html>
<html>
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" >
 <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" >
 
 <meta name="ROBOTS" content="NOARCHIVE">
 
 <link rel="icon" type="image/vnd.microsoft.icon" href="https://ssl.gstatic.com/codesite/ph/images/phosting.ico">
 
 
 <script type="text/javascript">
 
 
 
 
 var codesite_token = null;
 
 
 var CS_env = {"loggedInUserEmail": null, "token": null, "projectHomeUrl": "/p/js-test-driver", "projectName": "js-test-driver", "profileUrl": null, "domainName": null, "assetVersionPath": "https://ssl.gstatic.com/codesite/ph/1729405847801014513", "assetHostPath": "https://ssl.gstatic.com/codesite/ph", "relativeBaseUrl": ""};
 var _gaq = _gaq || [];
 _gaq.push(
 ['siteTracker._setAccount', 'UA-18071-1'],
 ['siteTracker._trackPageview']);
 
 _gaq.push(
 ['projectTracker._setAccount', 'UA-8962953-1'],
 ['projectTracker._trackPageview']);
 
 (function() {
 var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
 ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
 (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ga);
 })();
 
 </script>
 
 
 <title>equiv.js - 
 js-test-driver -
 
 
 Remote javascript console - Google Project Hosting
 </title>
 <link type="text/css" rel="stylesheet" href="https://ssl.gstatic.com/codesite/ph/1729405847801014513/css/core.css">
 
 <link type="text/css" rel="stylesheet" href="https://ssl.gstatic.com/codesite/ph/1729405847801014513/css/ph_detail.css" >
 
 
 <link type="text/css" rel="stylesheet" href="https://ssl.gstatic.com/codesite/ph/1729405847801014513/css/d_sb.css" >
 
 
 
<!--[if IE]>
 <link type="text/css" rel="stylesheet" href="https://ssl.gstatic.com/codesite/ph/1729405847801014513/css/d_ie.css" >
<![endif]-->
 <style type="text/css">
 .menuIcon.off { background: no-repeat url(https://ssl.gstatic.com/codesite/ph/images/dropdown_sprite.gif) 0 -42px }
 .menuIcon.on { background: no-repeat url(https://ssl.gstatic.com/codesite/ph/images/dropdown_sprite.gif) 0 -28px }
 .menuIcon.down { background: no-repeat url(https://ssl.gstatic.com/codesite/ph/images/dropdown_sprite.gif) 0 0; }
 
 
 
  tr.inline_comment {
 background: #fff;
 vertical-align: top;
 }
 div.draft, div.published {
 padding: .3em;
 border: 1px solid #999; 
 margin-bottom: .1em;
 font-family: arial, sans-serif;
 max-width: 60em;
 }
 div.draft {
 background: #ffa;
 } 
 div.published {
 background: #e5ecf9;
 }
 div.published .body, div.draft .body {
 padding: .5em .1em .1em .1em;
 max-width: 60em;
 white-space: pre-wrap;
 white-space: -moz-pre-wrap;
 white-space: -pre-wrap;
 white-space: -o-pre-wrap;
 word-wrap: break-word;
 font-size: 1em;
 }
 div.draft .actions {
 margin-left: 1em;
 font-size: 90%;
 }
 div.draft form {
 padding: .5em .5em .5em 0;
 }
 div.draft textarea, div.published textarea {
 width: 95%;
 height: 10em;
 font-family: arial, sans-serif;
 margin-bottom: .5em;
 }

 
 .nocursor, .nocursor td, .cursor_hidden, .cursor_hidden td {
 background-color: white;
 height: 2px;
 }
 .cursor, .cursor td {
 background-color: darkblue;
 height: 2px;
 display: '';
 }
 
 
.list {
 border: 1px solid white;
 border-bottom: 0;
}

 
 </style>
</head>
<body class="t4">
<script type="text/javascript">
 window.___gcfg = {lang: 'en'};
 (function() 
 {var po = document.createElement("script");
 po.type = "text/javascript"; po.async = true;po.src = "https://apis.google.com/js/plusone.js";
 var s = document.getElementsByTagName("script")[0];
 s.parentNode.insertBefore(po, s);
 })();
</script>
<div class="headbg">

 <div id="gaia">
 

 <span>
 
 
 <a href="#" id="projects-dropdown" onclick="return false;"><u>My favorites</u> <small>&#9660;</small></a>
 | <a href="https://www.google.com/accounts/ServiceLogin?service=code&amp;ltmpl=phosting&amp;continue=https%3A%2F%2Fcode.google.com%2Fp%2Fjs-test-driver%2Fsource%2Fbrowse%2FJsTestDriver%2Fcontrib%2Fqunit%2Fsrc%2Fequiv.js&amp;followup=https%3A%2F%2Fcode.google.com%2Fp%2Fjs-test-driver%2Fsource%2Fbrowse%2FJsTestDriver%2Fcontrib%2Fqunit%2Fsrc%2Fequiv.js" onclick="_CS_click('/gb/ph/signin');"><u>Sign in</u></a>
 
 </span>

 </div>

 <div class="gbh" style="left: 0pt;"></div>
 <div class="gbh" style="right: 0pt;"></div>
 
 
 <div style="height: 1px"></div>
<!--[if lte IE 7]>
<div style="text-align:center;">
Your version of Internet Explorer is not supported. Try a browser that
contributes to open source, such as <a href="http://www.firefox.com">Firefox</a>,
<a href="http://www.google.com/chrome">Google Chrome</a>, or
<a href="http://code.google.com/chrome/chromeframe/">Google Chrome Frame</a>.
</div>
<![endif]-->



 <table style="padding:0px; margin: 0px 0px 10px 0px; width:100%" cellpadding="0" cellspacing="0"
 itemscope itemtype="http://schema.org/CreativeWork">
 <tr style="height: 58px;">
 
 
 
 <td id="plogo">
 <link itemprop="url" href="/p/js-test-driver">
 <a href="/p/js-test-driver/">
 
 <img src="https://ssl.gstatic.com/codesite/ph/images/search-48.gif" alt="Logo" itemprop="image">
 
 </a>
 </td>
 
 <td style="padding-left: 0.5em">
 
 <div id="pname">
 <a href="/p/js-test-driver/"><span itemprop="name">js-test-driver</span></a>
 </div>
 
 <div id="psum">
 <a id="project_summary_link"
 href="/p/js-test-driver/"><span itemprop="description">Remote javascript console</span></a>
 
 </div>
 
 
 </td>
 <td style="white-space:nowrap;text-align:right; vertical-align:bottom;">
 
 <form action="/hosting/search">
 <input size="30" name="q" value="" type="text">
 
 <input type="submit" name="projectsearch" value="Search projects" >
 </form>
 
 </tr>
 </table>

</div>

 
<div id="mt" class="gtb"> 
 <a href="/p/js-test-driver/" class="tab ">Project&nbsp;Home</a>
 
 
 
 
 <a href="/p/js-test-driver/downloads/list" class="tab ">Downloads</a>
 
 
 
 
 
 <a href="/p/js-test-driver/w/list" class="tab ">Wiki</a>
 
 
 
 
 
 <a href="/p/js-test-driver/issues/list"
 class="tab ">Issues</a>
 
 
 
 
 
 <a href="/p/js-test-driver/source/checkout"
 class="tab active">Source</a>
 
 
 
 
 
 
 
 
 <div class=gtbc></div>
</div>
<table cellspacing="0" cellpadding="0" width="100%" align="center" border="0" class="st">
 <tr>
 
 
 
 
 
 
 <td class="subt">
 <div class="st2">
 <div class="isf">
 
 <form action="/p/js-test-driver/source/browse" style="display: inline">
 
 Repository:
 <select name="repo" id="repo" style="font-size: 92%" onchange="submit()">
 <option value="default">default</option><option value="wiki">wiki</option>
 </select>
 </form>
 
 


 <span class="inst1"><a href="/p/js-test-driver/source/checkout">Checkout</a></span> &nbsp;
 <span class="inst2"><a href="/p/js-test-driver/source/browse/">Browse</a></span> &nbsp;
 <span class="inst3"><a href="/p/js-test-driver/source/list">Changes</a></span> &nbsp;
 <span class="inst4"><a href="/p/js-test-driver/source/clones">Clones</a></span> &nbsp; 
 
 
 
 
 
 
 </form>
 <script type="text/javascript">
 
 function codesearchQuery(form) {
 var query = document.getElementById('q').value;
 if (query) { form.action += '%20' + query; }
 }
 </script>
 </div>
</div>

 </td>
 
 
 
 <td align="right" valign="top" class="bevel-right"></td>
 </tr>
</table>


<script type="text/javascript">
 var cancelBubble = false;
 function _go(url) { document.location = url; }
</script>
<div id="maincol"
 
>

 




<div class="expand">
<div id="colcontrol">
<style type="text/css">
 #file_flipper { white-space: nowrap; padding-right: 2em; }
 #file_flipper.hidden { display: none; }
 #file_flipper .pagelink { color: #0000CC; text-decoration: underline; }
 #file_flipper #visiblefiles { padding-left: 0.5em; padding-right: 0.5em; }
</style>
<table id="nav_and_rev" class="list"
 cellpadding="0" cellspacing="0" width="100%">
 <tr>
 
 <td nowrap="nowrap" class="src_crumbs src_nav" width="33%">
 <strong class="src_nav">Source path:&nbsp;</strong>
 <span id="crumb_root">
 
 <a href="/p/js-test-driver/source/browse/">git</a>/&nbsp;</span>
 <span id="crumb_links" class="ifClosed"><a href="/p/js-test-driver/source/browse/JsTestDriver/">JsTestDriver</a><span class="sp">/&nbsp;</span><a href="/p/js-test-driver/source/browse/JsTestDriver/contrib/">contrib</a><span class="sp">/&nbsp;</span><a href="/p/js-test-driver/source/browse/JsTestDriver/contrib/qunit/">qunit</a><span class="sp">/&nbsp;</span><a href="/p/js-test-driver/source/browse/JsTestDriver/contrib/qunit/src/">src</a><span class="sp">/&nbsp;</span>equiv.js</span>
 
 
 
 
 
 <span class="sourcelabel"><strong>Branch:</strong> master</span>
 
 
 
 
 <form class="src_nav">
 
 <span class="sourcelabel">
 <strong>Tag:</strong>
 <select id="tag_select" name="name" onchange="submit()">
 <option value="">&lt;none&gt;</option>
 
 <option value="v1.3.5" >v1.3.5</option>
 
 </select>
 </span>
 </form>
 
 


 <span class="sourcelabel">Download
 <a href="//js-test-driver.googlecode.com/archive/f527fd5bcbe216ba45b2237a9582c4e434aefd64.zip" rel="nofollow">zip</a> | <a href="//js-test-driver.googlecode.com/archive/f527fd5bcbe216ba45b2237a9582c4e434aefd64.tar.gz" rel="nofollow">tar.gz</a>
 </span>


 </td>
 
 
 <td nowrap="nowrap" width="33%" align="right">
 <table cellpadding="0" cellspacing="0" style="font-size: 100%"><tr>
 
 
 <td class="flipper"><b>f527fd5bcbe2</b></td>
 
 </tr></table>
 </td> 
 </tr>
</table>

<div class="fc">
 
 
 
<style type="text/css">
.undermouse span {
 background-image: url(https://ssl.gstatic.com/codesite/ph/images/comments.gif); }
</style>
<table class="opened" id="review_comment_area"
><tr>
<td id="nums">
<pre><table width="100%"><tr class="nocursor"><td></td></tr></table></pre>
<pre><table width="100%" id="nums_table_0"><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_1"

><td id="1"><a href="#1">1</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_2"

><td id="2"><a href="#2">2</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_3"

><td id="3"><a href="#3">3</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_4"

><td id="4"><a href="#4">4</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_5"

><td id="5"><a href="#5">5</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_6"

><td id="6"><a href="#6">6</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_7"

><td id="7"><a href="#7">7</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_8"

><td id="8"><a href="#8">8</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_9"

><td id="9"><a href="#9">9</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_10"

><td id="10"><a href="#10">10</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_11"

><td id="11"><a href="#11">11</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_12"

><td id="12"><a href="#12">12</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_13"

><td id="13"><a href="#13">13</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_14"

><td id="14"><a href="#14">14</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_15"

><td id="15"><a href="#15">15</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_16"

><td id="16"><a href="#16">16</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_17"

><td id="17"><a href="#17">17</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_18"

><td id="18"><a href="#18">18</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_19"

><td id="19"><a href="#19">19</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_20"

><td id="20"><a href="#20">20</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_21"

><td id="21"><a href="#21">21</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_22"

><td id="22"><a href="#22">22</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_23"

><td id="23"><a href="#23">23</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_24"

><td id="24"><a href="#24">24</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_25"

><td id="25"><a href="#25">25</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_26"

><td id="26"><a href="#26">26</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_27"

><td id="27"><a href="#27">27</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_28"

><td id="28"><a href="#28">28</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_29"

><td id="29"><a href="#29">29</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_30"

><td id="30"><a href="#30">30</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_31"

><td id="31"><a href="#31">31</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_32"

><td id="32"><a href="#32">32</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_33"

><td id="33"><a href="#33">33</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_34"

><td id="34"><a href="#34">34</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_35"

><td id="35"><a href="#35">35</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_36"

><td id="36"><a href="#36">36</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_37"

><td id="37"><a href="#37">37</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_38"

><td id="38"><a href="#38">38</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_39"

><td id="39"><a href="#39">39</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_40"

><td id="40"><a href="#40">40</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_41"

><td id="41"><a href="#41">41</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_42"

><td id="42"><a href="#42">42</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_43"

><td id="43"><a href="#43">43</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_44"

><td id="44"><a href="#44">44</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_45"

><td id="45"><a href="#45">45</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_46"

><td id="46"><a href="#46">46</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_47"

><td id="47"><a href="#47">47</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_48"

><td id="48"><a href="#48">48</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_49"

><td id="49"><a href="#49">49</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_50"

><td id="50"><a href="#50">50</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_51"

><td id="51"><a href="#51">51</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_52"

><td id="52"><a href="#52">52</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_53"

><td id="53"><a href="#53">53</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_54"

><td id="54"><a href="#54">54</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_55"

><td id="55"><a href="#55">55</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_56"

><td id="56"><a href="#56">56</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_57"

><td id="57"><a href="#57">57</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_58"

><td id="58"><a href="#58">58</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_59"

><td id="59"><a href="#59">59</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_60"

><td id="60"><a href="#60">60</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_61"

><td id="61"><a href="#61">61</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_62"

><td id="62"><a href="#62">62</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_63"

><td id="63"><a href="#63">63</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_64"

><td id="64"><a href="#64">64</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_65"

><td id="65"><a href="#65">65</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_66"

><td id="66"><a href="#66">66</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_67"

><td id="67"><a href="#67">67</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_68"

><td id="68"><a href="#68">68</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_69"

><td id="69"><a href="#69">69</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_70"

><td id="70"><a href="#70">70</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_71"

><td id="71"><a href="#71">71</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_72"

><td id="72"><a href="#72">72</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_73"

><td id="73"><a href="#73">73</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_74"

><td id="74"><a href="#74">74</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_75"

><td id="75"><a href="#75">75</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_76"

><td id="76"><a href="#76">76</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_77"

><td id="77"><a href="#77">77</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_78"

><td id="78"><a href="#78">78</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_79"

><td id="79"><a href="#79">79</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_80"

><td id="80"><a href="#80">80</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_81"

><td id="81"><a href="#81">81</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_82"

><td id="82"><a href="#82">82</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_83"

><td id="83"><a href="#83">83</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_84"

><td id="84"><a href="#84">84</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_85"

><td id="85"><a href="#85">85</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_86"

><td id="86"><a href="#86">86</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_87"

><td id="87"><a href="#87">87</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_88"

><td id="88"><a href="#88">88</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_89"

><td id="89"><a href="#89">89</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_90"

><td id="90"><a href="#90">90</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_91"

><td id="91"><a href="#91">91</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_92"

><td id="92"><a href="#92">92</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_93"

><td id="93"><a href="#93">93</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_94"

><td id="94"><a href="#94">94</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_95"

><td id="95"><a href="#95">95</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_96"

><td id="96"><a href="#96">96</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_97"

><td id="97"><a href="#97">97</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_98"

><td id="98"><a href="#98">98</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_99"

><td id="99"><a href="#99">99</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_100"

><td id="100"><a href="#100">100</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_101"

><td id="101"><a href="#101">101</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_102"

><td id="102"><a href="#102">102</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_103"

><td id="103"><a href="#103">103</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_104"

><td id="104"><a href="#104">104</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_105"

><td id="105"><a href="#105">105</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_106"

><td id="106"><a href="#106">106</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_107"

><td id="107"><a href="#107">107</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_108"

><td id="108"><a href="#108">108</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_109"

><td id="109"><a href="#109">109</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_110"

><td id="110"><a href="#110">110</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_111"

><td id="111"><a href="#111">111</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_112"

><td id="112"><a href="#112">112</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_113"

><td id="113"><a href="#113">113</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_114"

><td id="114"><a href="#114">114</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_115"

><td id="115"><a href="#115">115</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_116"

><td id="116"><a href="#116">116</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_117"

><td id="117"><a href="#117">117</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_118"

><td id="118"><a href="#118">118</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_119"

><td id="119"><a href="#119">119</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_120"

><td id="120"><a href="#120">120</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_121"

><td id="121"><a href="#121">121</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_122"

><td id="122"><a href="#122">122</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_123"

><td id="123"><a href="#123">123</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_124"

><td id="124"><a href="#124">124</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_125"

><td id="125"><a href="#125">125</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_126"

><td id="126"><a href="#126">126</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_127"

><td id="127"><a href="#127">127</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_128"

><td id="128"><a href="#128">128</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_129"

><td id="129"><a href="#129">129</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_130"

><td id="130"><a href="#130">130</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_131"

><td id="131"><a href="#131">131</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_132"

><td id="132"><a href="#132">132</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_133"

><td id="133"><a href="#133">133</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_134"

><td id="134"><a href="#134">134</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_135"

><td id="135"><a href="#135">135</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_136"

><td id="136"><a href="#136">136</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_137"

><td id="137"><a href="#137">137</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_138"

><td id="138"><a href="#138">138</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_139"

><td id="139"><a href="#139">139</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_140"

><td id="140"><a href="#140">140</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_141"

><td id="141"><a href="#141">141</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_142"

><td id="142"><a href="#142">142</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_143"

><td id="143"><a href="#143">143</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_144"

><td id="144"><a href="#144">144</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_145"

><td id="145"><a href="#145">145</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_146"

><td id="146"><a href="#146">146</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_147"

><td id="147"><a href="#147">147</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_148"

><td id="148"><a href="#148">148</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_149"

><td id="149"><a href="#149">149</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_150"

><td id="150"><a href="#150">150</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_151"

><td id="151"><a href="#151">151</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_152"

><td id="152"><a href="#152">152</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_153"

><td id="153"><a href="#153">153</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_154"

><td id="154"><a href="#154">154</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_155"

><td id="155"><a href="#155">155</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_156"

><td id="156"><a href="#156">156</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_157"

><td id="157"><a href="#157">157</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_158"

><td id="158"><a href="#158">158</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_159"

><td id="159"><a href="#159">159</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_160"

><td id="160"><a href="#160">160</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_161"

><td id="161"><a href="#161">161</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_162"

><td id="162"><a href="#162">162</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_163"

><td id="163"><a href="#163">163</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_164"

><td id="164"><a href="#164">164</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_165"

><td id="165"><a href="#165">165</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_166"

><td id="166"><a href="#166">166</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_167"

><td id="167"><a href="#167">167</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_168"

><td id="168"><a href="#168">168</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_169"

><td id="169"><a href="#169">169</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_170"

><td id="170"><a href="#170">170</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_171"

><td id="171"><a href="#171">171</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_172"

><td id="172"><a href="#172">172</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_173"

><td id="173"><a href="#173">173</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_174"

><td id="174"><a href="#174">174</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_175"

><td id="175"><a href="#175">175</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_176"

><td id="176"><a href="#176">176</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_177"

><td id="177"><a href="#177">177</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_178"

><td id="178"><a href="#178">178</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_179"

><td id="179"><a href="#179">179</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_180"

><td id="180"><a href="#180">180</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_181"

><td id="181"><a href="#181">181</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_182"

><td id="182"><a href="#182">182</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_183"

><td id="183"><a href="#183">183</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_184"

><td id="184"><a href="#184">184</a></td></tr
><tr id="gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_185"

><td id="185"><a href="#185">185</a></td></tr
></table></pre>
<pre><table width="100%"><tr class="nocursor"><td></td></tr></table></pre>
</td>
<td id="lines">
<pre><table width="100%"><tr class="cursor_stop cursor_hidden"><td></td></tr></table></pre>
<pre class="prettyprint lang-js"><table id="src_table_0"><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_1

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_2

><td class="source">// Tests for equality any JavaScript type and structure without unexpected results.<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_3

><td class="source">// Discussions and reference: http://philrathe.com/articles/equiv<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_4

><td class="source">// Test suites: http://philrathe.com/tests/equiv<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_5

><td class="source">// Author: Philippe Rath &lt;prathe@gmail.com&gt;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_6

><td class="source">window.equiv = function () {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_7

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_8

><td class="source">    var innerEquiv; // the real equiv function<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_9

><td class="source">    var callers = []; // stack to decide between skip/abort functions<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_10

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_11

><td class="source">    // Determine what is o.<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_12

><td class="source">    function hoozit(o) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_13

><td class="source">        if (typeof o === &quot;string&quot;) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_14

><td class="source">            return &quot;string&quot;;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_15

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_16

><td class="source">        } else if (typeof o === &quot;boolean&quot;) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_17

><td class="source">            return &quot;boolean&quot;;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_18

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_19

><td class="source">        } else if (typeof o === &quot;number&quot;) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_20

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_21

><td class="source">            if (isNaN(o)) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_22

><td class="source">                return &quot;nan&quot;;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_23

><td class="source">            } else {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_24

><td class="source">                return &quot;number&quot;;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_25

><td class="source">            }<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_26

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_27

><td class="source">        } else if (typeof o === &quot;undefined&quot;) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_28

><td class="source">            return &quot;undefined&quot;;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_29

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_30

><td class="source">        // consider: typeof null === object<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_31

><td class="source">        } else if (o === null) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_32

><td class="source">            return &quot;null&quot;;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_33

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_34

><td class="source">        // consider: typeof [] === object<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_35

><td class="source">        } else if (o instanceof Array) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_36

><td class="source">            return &quot;array&quot;;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_37

><td class="source">        <br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_38

><td class="source">        // consider: typeof new Date() === object<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_39

><td class="source">        } else if (o instanceof Date) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_40

><td class="source">            return &quot;date&quot;;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_41

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_42

><td class="source">        // consider: /./ instanceof Object;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_43

><td class="source">        //           /./ instanceof RegExp;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_44

><td class="source">        //          typeof /./ === &quot;function&quot;; // =&gt; false in IE and Opera,<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_45

><td class="source">        //                                          true in FF and Safari<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_46

><td class="source">        } else if (o instanceof RegExp) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_47

><td class="source">            return &quot;regexp&quot;;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_48

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_49

><td class="source">        } else if (typeof o === &quot;object&quot;) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_50

><td class="source">            return &quot;object&quot;;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_51

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_52

><td class="source">        } else if (o instanceof Function) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_53

><td class="source">            return &quot;function&quot;;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_54

><td class="source">        }<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_55

><td class="source">    }<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_56

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_57

><td class="source">    // Call the o related callback with the given arguments.<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_58

><td class="source">    function bindCallbacks(o, callbacks, args) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_59

><td class="source">        var prop = hoozit(o);<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_60

><td class="source">        if (prop) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_61

><td class="source">            if (hoozit(callbacks[prop]) === &quot;function&quot;) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_62

><td class="source">                return callbacks[prop].apply(callbacks, args);<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_63

><td class="source">            } else {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_64

><td class="source">                return callbacks[prop]; // or undefined<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_65

><td class="source">            }<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_66

><td class="source">        }<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_67

><td class="source">    }<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_68

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_69

><td class="source">    var callbacks = function () {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_70

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_71

><td class="source">        // for string, boolean, number and null<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_72

><td class="source">        function useStrictEquality(b, a) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_73

><td class="source">            return a === b;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_74

><td class="source">        }<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_75

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_76

><td class="source">        return {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_77

><td class="source">            &quot;string&quot;: useStrictEquality,<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_78

><td class="source">            &quot;boolean&quot;: useStrictEquality,<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_79

><td class="source">            &quot;number&quot;: useStrictEquality,<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_80

><td class="source">            &quot;null&quot;: useStrictEquality,<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_81

><td class="source">            &quot;undefined&quot;: useStrictEquality,<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_82

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_83

><td class="source">            &quot;nan&quot;: function (b) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_84

><td class="source">                return isNaN(b);<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_85

><td class="source">            },<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_86

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_87

><td class="source">            &quot;date&quot;: function (b, a) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_88

><td class="source">                return hoozit(b) === &quot;date&quot; &amp;&amp; a.valueOf() === b.valueOf();<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_89

><td class="source">            },<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_90

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_91

><td class="source">            &quot;regexp&quot;: function (b, a) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_92

><td class="source">                return hoozit(b) === &quot;regexp&quot; &amp;&amp;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_93

><td class="source">                    a.source === b.source &amp;&amp; // the regex itself<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_94

><td class="source">                    a.global === b.global &amp;&amp; // and its modifers (gmi) ...<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_95

><td class="source">                    a.ignoreCase === b.ignoreCase &amp;&amp;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_96

><td class="source">                    a.multiline === b.multiline;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_97

><td class="source">            },<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_98

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_99

><td class="source">            // - skip when the property is a method of an instance (OOP)<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_100

><td class="source">            // - abort otherwise,<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_101

><td class="source">            //   initial === would have catch identical references anyway<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_102

><td class="source">            &quot;function&quot;: function () {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_103

><td class="source">                var caller = callers[callers.length - 1];<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_104

><td class="source">                return caller !== Object &amp;&amp;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_105

><td class="source">                        typeof caller !== &quot;undefined&quot;;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_106

><td class="source">            },<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_107

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_108

><td class="source">            &quot;array&quot;: function (b, a) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_109

><td class="source">                var i;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_110

><td class="source">                var len;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_111

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_112

><td class="source">                // b could be an object literal here<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_113

><td class="source">                if ( ! (hoozit(b) === &quot;array&quot;)) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_114

><td class="source">                    return false;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_115

><td class="source">                }<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_116

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_117

><td class="source">                len = a.length;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_118

><td class="source">                if (len !== b.length) { // safe and faster<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_119

><td class="source">                    return false;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_120

><td class="source">                }<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_121

><td class="source">                for (i = 0; i &lt; len; i++) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_122

><td class="source">                    if( ! innerEquiv(a[i], b[i])) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_123

><td class="source">                        return false;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_124

><td class="source">                    }<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_125

><td class="source">                }<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_126

><td class="source">                return true;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_127

><td class="source">            },<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_128

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_129

><td class="source">            &quot;object&quot;: function (b, a) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_130

><td class="source">                var i;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_131

><td class="source">                var eq = true; // unless we can proove it<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_132

><td class="source">                var aProperties = [], bProperties = []; // collection of strings<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_133

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_134

><td class="source">                // comparing constructors is more strict than using instanceof<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_135

><td class="source">                if ( a.constructor !== b.constructor) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_136

><td class="source">                    return false;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_137

><td class="source">                }<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_138

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_139

><td class="source">                // stack constructor before traversing properties<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_140

><td class="source">                callers.push(a.constructor);<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_141

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_142

><td class="source">                for (i in a) { // be strict: don&#39;t ensures hasOwnProperty and go deep<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_143

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_144

><td class="source">                    aProperties.push(i); // collect a&#39;s properties<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_145

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_146

><td class="source">                    if ( ! innerEquiv(a[i], b[i])) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_147

><td class="source">                        eq = false;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_148

><td class="source">                    }<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_149

><td class="source">                }<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_150

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_151

><td class="source">                callers.pop(); // unstack, we are done<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_152

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_153

><td class="source">                for (i in b) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_154

><td class="source">                    bProperties.push(i); // collect b&#39;s properties<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_155

><td class="source">                }<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_156

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_157

><td class="source">                // Ensures identical properties name<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_158

><td class="source">                return eq &amp;&amp; innerEquiv(aProperties.sort(), bProperties.sort());<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_159

><td class="source">            }<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_160

><td class="source">        };<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_161

><td class="source">    }();<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_162

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_163

><td class="source">    innerEquiv = function () { // can take multiple arguments<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_164

><td class="source">        var args = Array.prototype.slice.apply(arguments);<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_165

><td class="source">        if (args.length &lt; 2) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_166

><td class="source">            return true; // end transition<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_167

><td class="source">        }<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_168

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_169

><td class="source">        return (function (a, b) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_170

><td class="source">            if (a === b) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_171

><td class="source">                return true; // catch the most you can<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_172

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_173

><td class="source">            } else if (typeof a !== typeof b || a === null || b === null || typeof a === &quot;undefined&quot; || typeof b === &quot;undefined&quot;) {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_174

><td class="source">                return false; // don&#39;t lose time with error prone cases<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_175

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_176

><td class="source">            } else {<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_177

><td class="source">                return bindCallbacks(a, callbacks, [b, a]);<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_178

><td class="source">            }<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_179

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_180

><td class="source">        // apply transition with (1..n) arguments<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_181

><td class="source">        })(args[0], args[1]) &amp;&amp; arguments.callee.apply(this, args.splice(1, args.length -1));<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_182

><td class="source">    };<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_183

><td class="source"><br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_184

><td class="source">    return innerEquiv;<br></td></tr
><tr
id=sl_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_185

><td class="source">}(); // equiv<br></td></tr
></table></pre>
<pre><table width="100%"><tr class="cursor_stop cursor_hidden"><td></td></tr></table></pre>
</td>
</tr></table>

 
<script type="text/javascript">
 var lineNumUnderMouse = -1;
 
 function gutterOver(num) {
 gutterOut();
 var newTR = document.getElementById('gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_' + num);
 if (newTR) {
 newTR.className = 'undermouse';
 }
 lineNumUnderMouse = num;
 }
 function gutterOut() {
 if (lineNumUnderMouse != -1) {
 var oldTR = document.getElementById(
 'gr_svnf527fd5bcbe216ba45b2237a9582c4e434aefd64_' + lineNumUnderMouse);
 if (oldTR) {
 oldTR.className = '';
 }
 lineNumUnderMouse = -1;
 }
 }
 var numsGenState = {table_base_id: 'nums_table_'};
 var srcGenState = {table_base_id: 'src_table_'};
 var alignerRunning = false;
 var startOver = false;
 function setLineNumberHeights() {
 if (alignerRunning) {
 startOver = true;
 return;
 }
 numsGenState.chunk_id = 0;
 numsGenState.table = document.getElementById('nums_table_0');
 numsGenState.row_num = 0;
 if (!numsGenState.table) {
 return; // Silently exit if no file is present.
 }
 srcGenState.chunk_id = 0;
 srcGenState.table = document.getElementById('src_table_0');
 srcGenState.row_num = 0;
 alignerRunning = true;
 continueToSetLineNumberHeights();
 }
 function rowGenerator(genState) {
 if (genState.row_num < genState.table.rows.length) {
 var currentRow = genState.table.rows[genState.row_num];
 genState.row_num++;
 return currentRow;
 }
 var newTable = document.getElementById(
 genState.table_base_id + (genState.chunk_id + 1));
 if (newTable) {
 genState.chunk_id++;
 genState.row_num = 0;
 genState.table = newTable;
 return genState.table.rows[0];
 }
 return null;
 }
 var MAX_ROWS_PER_PASS = 1000;
 function continueToSetLineNumberHeights() {
 var rowsInThisPass = 0;
 var numRow = 1;
 var srcRow = 1;
 while (numRow && srcRow && rowsInThisPass < MAX_ROWS_PER_PASS) {
 numRow = rowGenerator(numsGenState);
 srcRow = rowGenerator(srcGenState);
 rowsInThisPass++;
 if (numRow && srcRow) {
 if (numRow.offsetHeight != srcRow.offsetHeight) {
 numRow.firstChild.style.height = srcRow.offsetHeight + 'px';
 }
 }
 }
 if (rowsInThisPass >= MAX_ROWS_PER_PASS) {
 setTimeout(continueToSetLineNumberHeights, 10);
 } else {
 alignerRunning = false;
 if (startOver) {
 startOver = false;
 setTimeout(setLineNumberHeights, 500);
 }
 }
 }
 function initLineNumberHeights() {
 // Do 2 complete passes, because there can be races
 // between this code and prettify.
 startOver = true;
 setTimeout(setLineNumberHeights, 250);
 window.onresize = setLineNumberHeights;
 }
 initLineNumberHeights();
</script>

 
 
 <div id="log">
 <div style="text-align:right">
 <a class="ifCollapse" href="#" onclick="_toggleMeta(this); return false">Show details</a>
 <a class="ifExpand" href="#" onclick="_toggleMeta(this); return false">Hide details</a>
 </div>
 <div class="ifExpand">
 
 
 <div class="pmeta_bubble_bg" style="border:1px solid white">
 <div class="round4"></div>
 <div class="round2"></div>
 <div class="round1"></div>
 <div class="box-inner">
 <div id="changelog">
 <p>Change log</p>
 <div>
 <a href="/p/js-test-driver/source/detail?spec=svnf527fd5bcbe216ba45b2237a9582c4e434aefd64&amp;r=7dbe2d0c49307ec32051deae718051a7569c1254">7dbe2d0c4930</a>
 by karl.okeeffe@gmail.com &lt;karl.oke...@gmail.com@205c1ca0-44cf-11de-84a6-839b6ed6c72e&gt;
 on Aug 30, 2009
 &nbsp; <a href="/p/js-test-driver/source/diff?spec=svnf527fd5bcbe216ba45b2237a9582c4e434aefd64&r=7dbe2d0c49307ec32051deae718051a7569c1254&amp;format=side&amp;path=/JsTestDriver/contrib/qunit/src/equiv.js&amp;old_path=/JsTestDriver/contrib/qunit/src/equiv.js&amp;old=">Diff</a>
 </div>
 <pre>Version 1.0.2

Tests now run successfully when the
lifecycle object exists but Setup and
Teardown are undefined.
Included a new test file, and JS Test
Driver config (tests of fail and error
behaviour currently commented out).
New folder structure, with src and src-
test directories.


...</pre>
 </div>
 
 
 
 
 
 
 <script type="text/javascript">
 var detail_url = '/p/js-test-driver/source/detail?r=7dbe2d0c49307ec32051deae718051a7569c1254&spec=svnf527fd5bcbe216ba45b2237a9582c4e434aefd64';
 var publish_url = '/p/js-test-driver/source/detail?r=7dbe2d0c49307ec32051deae718051a7569c1254&spec=svnf527fd5bcbe216ba45b2237a9582c4e434aefd64#publish';
 // describe the paths of this revision in javascript.
 var changed_paths = [];
 var changed_urls = [];
 
 changed_paths.push('/JsTestDriver/contrib/qunit/History.txt');
 changed_urls.push('/p/js-test-driver/source/browse/JsTestDriver/contrib/qunit/History.txt?r\x3d7dbe2d0c49307ec32051deae718051a7569c1254\x26spec\x3dsvnf527fd5bcbe216ba45b2237a9582c4e434aefd64');
 
 
 changed_paths.push('/JsTestDriver/contrib/qunit/README');
 changed_urls.push('/p/js-test-driver/source/browse/JsTestDriver/contrib/qunit/README?r\x3d7dbe2d0c49307ec32051deae718051a7569c1254\x26spec\x3dsvnf527fd5bcbe216ba45b2237a9582c4e434aefd64');
 
 
 changed_paths.push('/JsTestDriver/contrib/qunit/jsTestDriver.conf');
 changed_urls.push('/p/js-test-driver/source/browse/JsTestDriver/contrib/qunit/jsTestDriver.conf?r\x3d7dbe2d0c49307ec32051deae718051a7569c1254\x26spec\x3dsvnf527fd5bcbe216ba45b2237a9582c4e434aefd64');
 
 
 changed_paths.push('/JsTestDriver/contrib/qunit/src-test/tests.js');
 changed_urls.push('/p/js-test-driver/source/browse/JsTestDriver/contrib/qunit/src-test/tests.js?r\x3d7dbe2d0c49307ec32051deae718051a7569c1254\x26spec\x3dsvnf527fd5bcbe216ba45b2237a9582c4e434aefd64');
 
 
 changed_paths.push('/JsTestDriver/contrib/qunit/src/QUnitAdapter.js');
 changed_urls.push('/p/js-test-driver/source/browse/JsTestDriver/contrib/qunit/src/QUnitAdapter.js?r\x3d7dbe2d0c49307ec32051deae718051a7569c1254\x26spec\x3dsvnf527fd5bcbe216ba45b2237a9582c4e434aefd64');
 
 
 changed_paths.push('/JsTestDriver/contrib/qunit/src/equiv.js');
 changed_urls.push('/p/js-test-driver/source/browse/JsTestDriver/contrib/qunit/src/equiv.js?r\x3d7dbe2d0c49307ec32051deae718051a7569c1254\x26spec\x3dsvnf527fd5bcbe216ba45b2237a9582c4e434aefd64');
 
 var selected_path = '/JsTestDriver/contrib/qunit/src/equiv.js';
 
 
 function getCurrentPageIndex() {
 for (var i = 0; i < changed_paths.length; i++) {
 if (selected_path == changed_paths[i]) {
 return i;
 }
 }
 }
 function getNextPage() {
 var i = getCurrentPageIndex();
 if (i < changed_paths.length - 1) {
 return changed_urls[i + 1];
 }
 return null;
 }
 function getPreviousPage() {
 var i = getCurrentPageIndex();
 if (i > 0) {
 return changed_urls[i - 1];
 }
 return null;
 }
 function gotoNextPage() {
 var page = getNextPage();
 if (!page) {
 page = detail_url;
 }
 window.location = page;
 }
 function gotoPreviousPage() {
 var page = getPreviousPage();
 if (!page) {
 page = detail_url;
 }
 window.location = page;
 }
 function gotoDetailPage() {
 window.location = detail_url;
 }
 function gotoPublishPage() {
 window.location = publish_url;
 }
</script>

 
 <style type="text/css">
 #review_nav {
 border-top: 3px solid white;
 padding-top: 6px;
 margin-top: 1em;
 }
 #review_nav td {
 vertical-align: middle;
 }
 #review_nav select {
 margin: .5em 0;
 }
 </style>
 <div id="review_nav">
 <table><tr><td>Go to:&nbsp;</td><td>
 <select name="files_in_rev" onchange="window.location=this.value">
 
 <option value="/p/js-test-driver/source/browse/JsTestDriver/contrib/qunit/History.txt?r=7dbe2d0c49307ec32051deae718051a7569c1254&amp;spec=svnf527fd5bcbe216ba45b2237a9582c4e434aefd64"
 
 >...Driver/contrib/qunit/History.txt</option>
 
 <option value="/p/js-test-driver/source/browse/JsTestDriver/contrib/qunit/README?r=7dbe2d0c49307ec32051deae718051a7569c1254&amp;spec=svnf527fd5bcbe216ba45b2237a9582c4e434aefd64"
 
 >/JsTestDriver/contrib/qunit/README</option>
 
 <option value="/p/js-test-driver/source/browse/JsTestDriver/contrib/qunit/jsTestDriver.conf?r=7dbe2d0c49307ec32051deae718051a7569c1254&amp;spec=svnf527fd5bcbe216ba45b2237a9582c4e434aefd64"
 
 >.../contrib/qunit/jsTestDriver.conf</option>
 
 <option value="/p/js-test-driver/source/browse/JsTestDriver/contrib/qunit/src-test/tests.js?r=7dbe2d0c49307ec32051deae718051a7569c1254&amp;spec=svnf527fd5bcbe216ba45b2237a9582c4e434aefd64"
 
 >.../contrib/qunit/src-test/tests.js</option>
 
 <option value="/p/js-test-driver/source/browse/JsTestDriver/contrib/qunit/src/QUnitAdapter.js?r=7dbe2d0c49307ec32051deae718051a7569c1254&amp;spec=svnf527fd5bcbe216ba45b2237a9582c4e434aefd64"
 
 >...ontrib/qunit/src/QUnitAdapter.js</option>
 
 <option value="/p/js-test-driver/source/browse/JsTestDriver/contrib/qunit/src/equiv.js?r=7dbe2d0c49307ec32051deae718051a7569c1254&amp;spec=svnf527fd5bcbe216ba45b2237a9582c4e434aefd64"
 selected="selected"
 >...river/contrib/qunit/src/equiv.js</option>
 
 </select>
 </td></tr></table>
 
 
 



 <div style="white-space:nowrap">
 
 <a href="https://www.google.com/accounts/ServiceLogin?service=code&amp;ltmpl=phosting&amp;continue=https%3A%2F%2Fcode.google.com%2Fp%2Fjs-test-driver%2Fsource%2Fbrowse%2FJsTestDriver%2Fcontrib%2Fqunit%2Fsrc%2Fequiv.js&amp;followup=https%3A%2F%2Fcode.google.com%2Fp%2Fjs-test-driver%2Fsource%2Fbrowse%2FJsTestDriver%2Fcontrib%2Fqunit%2Fsrc%2Fequiv.js"
 >Sign in</a> to write a code review</div>


 
 </div>
 
 
 </div>
 <div class="round1"></div>
 <div class="round2"></div>
 <div class="round4"></div>
 </div>
 <div class="pmeta_bubble_bg" style="border:1px solid white">
 <div class="round4"></div>
 <div class="round2"></div>
 <div class="round1"></div>
 <div class="box-inner">
 <div id="older_bubble">
 <p>Older revisions</p>
 
 <a href="/p/js-test-driver/source/list?path=/JsTestDriver/contrib/qunit/src/equiv.js&r=7dbe2d0c49307ec32051deae718051a7569c1254">All revisions of this file</a>
 </div>
 </div>
 <div class="round1"></div>
 <div class="round2"></div>
 <div class="round4"></div>
 </div>
 
 <div class="pmeta_bubble_bg" style="border:1px solid white">
 <div class="round4"></div>
 <div class="round2"></div>
 <div class="round1"></div>
 <div class="box-inner">
 <div id="fileinfo_bubble">
 <p>File info</p>
 
 <div>Size: 5939 bytes,
 185 lines</div>
 
 <div><a href="//js-test-driver.googlecode.com/git/JsTestDriver/contrib/qunit/src/equiv.js">View raw file</a></div>
 </div>
 
 </div>
 <div class="round1"></div>
 <div class="round2"></div>
 <div class="round4"></div>
 </div>
 </div>
 </div>


</div>

</div>
</div>

<script src="https://ssl.gstatic.com/codesite/ph/1729405847801014513/js/prettify/prettify.js"></script>
<script type="text/javascript">prettyPrint();</script>


<script src="https://ssl.gstatic.com/codesite/ph/1729405847801014513/js/source_file_scripts.js"></script>

 <script type="text/javascript" src="https://ssl.gstatic.com/codesite/ph/1729405847801014513/js/kibbles.js"></script>
 <script type="text/javascript">
 var lastStop = null;
 var initialized = false;
 
 function updateCursor(next, prev) {
 if (prev && prev.element) {
 prev.element.className = 'cursor_stop cursor_hidden';
 }
 if (next && next.element) {
 next.element.className = 'cursor_stop cursor';
 lastStop = next.index;
 }
 }
 
 function pubRevealed(data) {
 updateCursorForCell(data.cellId, 'cursor_stop cursor_hidden');
 if (initialized) {
 reloadCursors();
 }
 }
 
 function draftRevealed(data) {
 updateCursorForCell(data.cellId, 'cursor_stop cursor_hidden');
 if (initialized) {
 reloadCursors();
 }
 }
 
 function draftDestroyed(data) {
 updateCursorForCell(data.cellId, 'nocursor');
 if (initialized) {
 reloadCursors();
 }
 }
 function reloadCursors() {
 kibbles.skipper.reset();
 loadCursors();
 if (lastStop != null) {
 kibbles.skipper.setCurrentStop(lastStop);
 }
 }
 // possibly the simplest way to insert any newly added comments
 // is to update the class of the corresponding cursor row,
 // then refresh the entire list of rows.
 function updateCursorForCell(cellId, className) {
 var cell = document.getElementById(cellId);
 // we have to go two rows back to find the cursor location
 var row = getPreviousElement(cell.parentNode);
 row.className = className;
 }
 // returns the previous element, ignores text nodes.
 function getPreviousElement(e) {
 var element = e.previousSibling;
 if (element.nodeType == 3) {
 element = element.previousSibling;
 }
 if (element && element.tagName) {
 return element;
 }
 }
 function loadCursors() {
 // register our elements with skipper
 var elements = CR_getElements('*', 'cursor_stop');
 var len = elements.length;
 for (var i = 0; i < len; i++) {
 var element = elements[i]; 
 element.className = 'cursor_stop cursor_hidden';
 kibbles.skipper.append(element);
 }
 }
 function toggleComments() {
 CR_toggleCommentDisplay();
 reloadCursors();
 }
 function keysOnLoadHandler() {
 // setup skipper
 kibbles.skipper.addStopListener(
 kibbles.skipper.LISTENER_TYPE.PRE, updateCursor);
 // Set the 'offset' option to return the middle of the client area
 // an option can be a static value, or a callback
 kibbles.skipper.setOption('padding_top', 50);
 // Set the 'offset' option to return the middle of the client area
 // an option can be a static value, or a callback
 kibbles.skipper.setOption('padding_bottom', 100);
 // Register our keys
 kibbles.skipper.addFwdKey("n");
 kibbles.skipper.addRevKey("p");
 kibbles.keys.addKeyPressListener(
 'u', function() { window.location = detail_url; });
 kibbles.keys.addKeyPressListener(
 'r', function() { window.location = detail_url + '#publish'; });
 
 kibbles.keys.addKeyPressListener('j', gotoNextPage);
 kibbles.keys.addKeyPressListener('k', gotoPreviousPage);
 
 
 }
 </script>
<script src="https://ssl.gstatic.com/codesite/ph/1729405847801014513/js/code_review_scripts.js"></script>
<script type="text/javascript">
 function showPublishInstructions() {
 var element = document.getElementById('review_instr');
 if (element) {
 element.className = 'opened';
 }
 }
 var codereviews;
 function revsOnLoadHandler() {
 // register our source container with the commenting code
 var paths = {'svnf527fd5bcbe216ba45b2237a9582c4e434aefd64': '/JsTestDriver/contrib/qunit/src/equiv.js'}
 codereviews = CR_controller.setup(
 {"loggedInUserEmail": null, "token": null, "projectHomeUrl": "/p/js-test-driver", "projectName": "js-test-driver", "profileUrl": null, "domainName": null, "assetVersionPath": "https://ssl.gstatic.com/codesite/ph/1729405847801014513", "assetHostPath": "https://ssl.gstatic.com/codesite/ph", "relativeBaseUrl": ""}, '', 'svnf527fd5bcbe216ba45b2237a9582c4e434aefd64', paths,
 CR_BrowseIntegrationFactory);
 
 codereviews.registerActivityListener(CR_ActivityType.REVEAL_DRAFT_PLATE, showPublishInstructions);
 
 codereviews.registerActivityListener(CR_ActivityType.REVEAL_PUB_PLATE, pubRevealed);
 codereviews.registerActivityListener(CR_ActivityType.REVEAL_DRAFT_PLATE, draftRevealed);
 codereviews.registerActivityListener(CR_ActivityType.DISCARD_DRAFT_COMMENT, draftDestroyed);
 
 
 
 
 
 
 
 var initialized = true;
 reloadCursors();
 }
 window.onload = function() {keysOnLoadHandler(); revsOnLoadHandler();};

</script>
<script type="text/javascript" src="https://ssl.gstatic.com/codesite/ph/1729405847801014513/js/dit_scripts.js"></script>

 
 
 
 <script type="text/javascript" src="https://ssl.gstatic.com/codesite/ph/1729405847801014513/js/ph_core.js"></script>
 
 
 
 
</div> 

<div id="footer" dir="ltr">
 <div class="text">
 <a href="/projecthosting/terms.html">Terms</a> -
 <a href="http://www.google.com/privacy.html">Privacy</a> -
 <a href="/p/support/">Project Hosting Help</a>
 </div>
</div>
 <div class="hostedBy" style="margin-top: -20px;">
 <span style="vertical-align: top;">Powered by <a href="http://code.google.com/projecthosting/">Google Project Hosting</a></span>
 </div>

 
 


 
 </body>
</html>

