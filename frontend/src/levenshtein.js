const levenshtein = function(s1, s2) {
  var k = Math.log(s1.length);
  k = Math.round(k);

  if (k === 0) {
    return s1 === s2;
  }
  if (Math.abs(s1.length - s2.length) > k) {
    return false;
  }

  var d = [],
    i,
    j,
    l,
    m;

  for (i = 0; i <= s1.length; i++) {
    d[i] = []; // Now d is a matrix with s1.length + 1 rows
    d[i][0] = i;
  }
  for (j = 1; j <= s2.length; j++) {
    d[0][j] = j;
  }

  for (i = 1; i <= s1.length; i++) {
    l = i - k < 1 ? 1 : i - k;
    m = i + k > s2.length ? s2.length : i + k;
    for (j = l; j <= m; j++) {
      if (s1.charAt(i - 1) === s2.charAt(j - 1)) {
        d[i][j] = d[i - 1][j - 1];
        continue;
      }
      if (j === l && d[i][j - 1] === undefined) {
        d[i][j] = Math.min(d[i - 1][j - 1] + 1, d[i - 1][j] + 1);
        continue;
      }
      if (j === m && d[i - 1][j] === undefined) {
        d[i][j] = Math.min(d[i][j - 1] + 1, d[i - 1][j - 1] + 1);
        continue;
      }
      d[i][j] = Math.min(d[i][j - 1] + 1, d[i - 1][j - 1] + 1, d[i - 1][j] + 1);
    }
  }

  return d[s1.length][s2.length] <= k;
};

export default levenshtein;
