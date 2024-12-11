module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Enforce lowercase in commit subjects (no uppercase letters)
    'subject-case': [2, 'never', ['upper-case']], 

    // Ensure commit message subject is not empty
    'subject-empty': [2, 'never'],  

    // Enforce a maximum header length of 72 characters
    'header-max-length': [2, 'always', 72],  

    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']
    ], 

    // Enforce a valid subject pattern without special characters
    'header-pattern': [2, 'always', /^[a-z0-9 ]+$/], 

    // Prevent uppercase letters in the commit message header
    'subject-min-length': [2, 'always', 1], // Require at least 1 character in subject
  },
};
