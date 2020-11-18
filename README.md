# Google-sheet-Hashing
Content of google sheet is hashed with CryptoJS

# Configuration for hashing sheets:

Open Google sheet
Rename the sheet name from 'sheet1' to 'Decrypted'


Open Tools--> Script editor
Paste the contents of Codes.gs in Code.gs file.

Add the cryptojs library in app script.
Resources--> libraries

Use the key (MSJnPeIon6nzdLewGV60xWqi_d-phDA33) to find CryptoGS library select the version as '4'

and click save.


# Working of Encryption and Decryption:

Reload the google sheet, you will get menu as 'Reveal' near 'Help' menu.

# Encryption:
Click on that and click encrypt. (If asked for permission to run script for sheet, just accept it because the script is created by you.)(Dont accept if you dont know the developer or code from unknown resource)

Dialog box will prompt for Key.

Give the private key/ master key (If you forgot the key, there is no way to retrive your hashed details)

Your contents will get hashed and saved in new file 'Encrypted'

# Decryption:
Same way as like encryption, give the same key as you have already encrypted.

New file 'Decrypted' is created with the contents visible.

# Note:
If you close the file as Decrypted, it will be in same Decryption form when you open it again.

# DISCLAIMER: DEVELOPER IS NOT RESPONSIBLE FOR ANY DATA LOSS BY USING THE SCRIPT







