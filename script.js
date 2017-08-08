var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
var q, fq, begin_date, end_date;

url += '?' + $.param({
	'api-key': "f330c68935624949862dfb8e8ac329fe",
	'q': q,
	'fq': fq,
	'begin_date': begin_date,
	'end_date': end_date
});

$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  console.log(result);
}).fail(function(err) {
  throw err;
});

$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  console.log(result);
});
