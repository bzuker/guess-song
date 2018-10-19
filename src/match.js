import levenshtein from './levenshtein';

const match = (pattern, guess) => {
  pattern = pattern.toLowerCase();
  guess = guess.toLowerCase();

  if (levenshtein(pattern, guess)) {
    return true;
  }

  let _pattern;

  if (~pattern.indexOf('.')) {
    // Ignore dots
    _pattern = pattern.replace(/\./g, '');
    if (levenshtein(_pattern, guess)) {
      return true;
    }
  }

  if (~pattern.indexOf('-')) {
    // Ignore dashes
    _pattern = pattern.replace(/\-/g, '');
    if (levenshtein(_pattern, guess)) {
      return true;
    }
  }

  if (~pattern.indexOf('+')) {
    // Allow to write "and" in place of "+"
    _pattern = pattern.replace(/\+/, 'and');
    if (levenshtein(_pattern, guess)) {
      return true;
    }
  }

  if (~pattern.indexOf(' & ') && !~pattern.indexOf('(')) {
    // Allow to write "and" in place of " & "
    _pattern = pattern.replace(/ & /, ' and ');
    if (levenshtein(_pattern, guess)) {
      return true;
    }
  }

  if (pattern.indexOf('the ') === 0) {
    // Ignore "the" at the beginning of artist name
    var nothe = artist.replace(/^the /, '');
    if (levenshtein(nothe, guess)) {
      return true;
    }
    if (~nothe.indexOf('.')) {
      _pattern = nothe.replace(/\./g, '');
      if (levenshtein(_pattern, guess)) {
        return true;
      }
    }
  }

  if (~pattern.indexOf(',')) {
    // Ignore commas
    _pattern = pattern.replace(/,/g, '');
    if (levenshtein(_pattern, guess)) {
      return true;
    }
  }

  if (/\(.+\)\??(?: \[.+\])?/.test(pattern)) {
    // Ignore additional info e.g. "(Love Theme from Titanic)"
    var normalized = pattern.replace(/\(.+\)\??(?: \[.+\])?/, '').trim();
    if (levenshtein(normalized, guess)) {
      return true;
    }

    if (~normalized.indexOf(' & ')) {
      _pattern = normalized.replace(/ & /, ' and ');
      if (levenshtein(_pattern, guess)) {
        return true;
      }
    }
  }

  if (/, [pP]t\. [0-9]$/.test(pattern)) {
    _pattern = pattern.replace(/, [pP]t\. [0-9]$/, '');
    if (levenshtein(_pattern, guess)) {
      return true;
    }
  }

  return false;
};

export default match;
