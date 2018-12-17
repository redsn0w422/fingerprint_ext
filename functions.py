# This file is used to generate code for content.js.
functions =  [
	'window.navigator.mediaDevices.enumerateDevices',
	'window.OfflineAudioContext',
    'window.webkitOfflineAudioContext',
    'navigator.userAgent',
    'navigator.language',
    'navigator.userLanguage',
    'navigator.browserLanguage',
    'navigator.systemLanguage',
    'window.screen.colorDepth',
    'navigator.deviceMemory',
    'window.devicePixelRatio',
    'window.screen.width',
    'window.screen.height',
    'window.screen.availWidth',
    'window.screen.availHeight',
    'window.Intl',
    'window.Intl.DateTimeFormat',
    'window.sessionStorage',
    'window.localStorage',
    'window.indexedDB',
    'window.openDatabase',
    'navigator.cpuClass',
    'navigator.platform',
    'navigator.doNotTrack',
    'navigator.msDoNotTrack',
    'window.doNotTrack',
    'window.swfobject',
    'navigator.plugins',
    'navigator.maxTouchPoints',
    'navigator.hardwareConcurrency'
]

# Not included:
# Date()
# document.body.addBehavior, body doesn't exist in scope yet
# document.createElement('canvas') -> more complex hook logic
# webGL, same as canvas
# checking for Ads
# font rendering

result = ""
for function in functions:
	result += "if ({0}) {0} = wrap({0})\n".format(function)
print(result)

print('\n'.join(functions))