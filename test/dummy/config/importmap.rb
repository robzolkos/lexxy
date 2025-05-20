# Pin npm packages by running ./bin/importmap

pin "application"

pin_all_from "app/javascript/controllers", under: "controllers"
pin "@rails/actiontext", to: "actiontext.esm.js"
pin "actiontext-lexical", to: "actiontext-lexical.js"
pin "@rails/activestorage", to: "activestorage.esm.js"
