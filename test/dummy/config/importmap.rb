# Pin npm packages by running ./bin/importmap

pin "application"

pin_all_from "app/javascript/controllers", under: "controllers"
pin "@rails/actiontext", to: "actiontext.esm.js"
pin "trix", to: "trix.js"
