# Regex for BibTeX Parser

STRING               REGEX
-------------------------------------------
(####)               \(\d{4}\)

Author               \s[A-Z]\w*\s

(Author ####)        \([A-Z]\w*\s\d{4}\)

(see Author ####)    \(\w*\s[A-Z]\w*\s\d{4}\)

(cf. Author ####)    \(\w*.\s[A-Z]\w*\s\d{4}\)

Last, First.        [A-Z]{1}\w*,\s[A-Z]{1}\w*.
Last, F.


I should make an enormous list of test cases so that I can put the regexp parser through the ringers.
