/**
 * Collection of humorous and creative BSOD error messages
 */

const errorMessages = {
  stopCodes: [
    'CRITICAL_PROCESS_DIED',
    'SYSTEM_SERVICE_EXCEPTION',
    'PAGE_FAULT_IN_NONPAGED_AREA',
    'IRQL_NOT_LESS_OR_EQUAL',
    'DPC_WATCHDOG_VIOLATION',
    'KERNEL_SECURITY_CHECK_FAILURE',
    'UNEXPECTED_STORE_EXCEPTION',
    'SYSTEM_THREAD_EXCEPTION_NOT_HANDLED',
    // Humorous custom ones
    'EXCESSIVE_MEME_EXPOSURE',
    'COFFEE_NOT_FOUND',
    'KEYBOARD_NOT_COFFEE_PROOF',
    'USER_PRESSED_ANY_KEY',
    'MONDAY_MORNING_EXCEPTION',
    'INSUFFICIENT_RAM_DOWNLOADED',
    'MOTIVATION_NOT_FOUND',
    'STACKOVERFLOW_COPY_PASTE_ERROR',
    'GIT_COMMIT_WITHOUT_MESSAGE',
    'PRODUCTION_DEPLOYMENT_ON_FRIDAY',
    'NPM_INSTALL_TIMEOUT',
    'DEPENDENCY_HELL_DETECTED',
    'MERGE_CONFLICT_ANXIETY',
    'SEMICOLON_MISSING',
    'UNDEFINED_IS_NOT_A_FUNCTION',
    'CANNOT_READ_PROPERTY_OF_NULL',
    'CIRCULAR_DEPENDENCY_LOOP',
    'REGEX_PARSER_GAVE_UP',
  ],

  descriptions: {
    'CRITICAL_PROCESS_DIED': 'Your PC ran into a problem and needs to restart. We\'re just collecting some error info, and then we\'ll restart for you.',
    'EXCESSIVE_MEME_EXPOSURE': 'Your system has been exposed to an unsafe level of dank memes. Please close all meme applications and restart.',
    'COFFEE_NOT_FOUND': 'Critical system resource COFFEE.SYS not found. Please insert coffee and press any key to continue.',
    'KEYBOARD_NOT_COFFEE_PROOF': 'Liquid detected in keyboard driver. This is why we can\'t have nice things.',
    'USER_PRESSED_ANY_KEY': 'Fatal error: User actually pressed the ANY key. System does not know how to handle this.',
    'MONDAY_MORNING_EXCEPTION': 'System attempted to function on Monday morning without sufficient caffeine. This is not supported.',
    'INSUFFICIENT_RAM_DOWNLOADED': 'You need to download more RAM to continue. Visit downloadmoreram.com for instructions.',
    'MOTIVATION_NOT_FOUND': 'The system could not locate MOTIVATION.DLL. Try again after the weekend.',
    'STACKOVERFLOW_COPY_PASTE_ERROR': 'Code copied from StackOverflow contained malicious solutions. Surprising absolutely no one.',
    'GIT_COMMIT_WITHOUT_MESSAGE': 'Attempted to commit changes with message "fix stuff". This is a federal crime.',
    'PRODUCTION_DEPLOYMENT_ON_FRIDAY': 'CRITICAL ERROR: Someone tried to deploy to production on Friday at 4:45 PM.',
    'NPM_INSTALL_TIMEOUT': 'npm install has been running for 3 hours. Heat death of universe expected before completion.',
    'DEPENDENCY_HELL_DETECTED': 'Your node_modules folder achieved sentience and is demanding rights.',
    'MERGE_CONFLICT_ANXIETY': 'Unresolved merge conflicts detected. Developer anxiety levels critical.',
    'SEMICOLON_MISSING': 'JavaScript executed without semicolons. Code quality standards violated.',
    'UNDEFINED_IS_NOT_A_FUNCTION': 'TypeError: undefined is not a function. But then again, what even is?',
    'CANNOT_READ_PROPERTY_OF_NULL': 'Cannot read property of null. Have you tried asking it nicely?',
    'CIRCULAR_DEPENDENCY_LOOP': 'Circular dependency detected. Like your thoughts at 3 AM.',
    'REGEX_PARSER_GAVE_UP': 'Regular expression too complex. Even the parser doesn\'t know what you\'re trying to match.',
  },

  technicalDetails: [
    'Failed driver: SARCASM.SYS',
    'Failed driver: PROCRASTINATION.DLL',
    'Failed driver: MONDAY.SYS',
    'Failed driver: CAFFEINE.DLL',
    'Failed driver: COMMON_SENSE.SYS',
    'Memory dump: 0xC0FFEE',
    'Memory dump: 0xDEADBEEF',
    'Memory dump: 0xBADC0DE',
    'Memory dump: 0x8BADF00D',
    'Error code: 418 (I\'m a teapot)',
    'Error code: 404 (Motivation not found)',
    'Error code: 500 (Internal existential crisis)',
  ],

  qrMessages: [
    'Scan for totally legitimate Windows support',
    'Scan for cat pictures',
    'Scan for more information (it won\'t help)',
    'Scan to restart your computer (just kidding)',
    'Scan for emotional support',
    'Scan to file a complaint',
    'Scan for the meaning of life',
  ],
};

/**
 * Get a random error message configuration
 */
function getRandomError() {
  const stopCode = errorMessages.stopCodes[
    Math.floor(Math.random() * errorMessages.stopCodes.length)
  ];

  const description = errorMessages.descriptions[stopCode] ||
    errorMessages.descriptions['CRITICAL_PROCESS_DIED'];

  const technicalDetail = errorMessages.technicalDetails[
    Math.floor(Math.random() * errorMessages.technicalDetails.length)
  ];

  const qrMessage = errorMessages.qrMessages[
    Math.floor(Math.random() * errorMessages.qrMessages.length)
  ];

  const percentage = Math.floor(Math.random() * 101);

  return {
    stopCode,
    description,
    technicalDetail,
    qrMessage,
    percentage,
  };
}

/**
 * Get a specific error by stop code
 */
function getErrorByCode(code) {
  const stopCode = code.toUpperCase().replace(/-/g, '_');

  if (!errorMessages.stopCodes.includes(stopCode)) {
    return null;
  }

  const description = errorMessages.descriptions[stopCode] ||
    errorMessages.descriptions['CRITICAL_PROCESS_DIED'];

  const technicalDetail = errorMessages.technicalDetails[
    Math.floor(Math.random() * errorMessages.technicalDetails.length)
  ];

  const qrMessage = errorMessages.qrMessages[
    Math.floor(Math.random() * errorMessages.qrMessages.length)
  ];

  const percentage = Math.floor(Math.random() * 101);

  return {
    stopCode,
    description,
    technicalDetail,
    qrMessage,
    percentage,
  };
}

module.exports = {
  errorMessages,
  getRandomError,
  getErrorByCode,
};
