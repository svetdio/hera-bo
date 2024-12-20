export default {
    login: 
    {
        'container':                      '.login-container',
        'user':                           'input[placeholder="Enter username"]',
        'password':                       'input[placeholder="Enter password"]',
        'submit':                         'button[type="submit"]',
        'failed':                         '.login-container .login-error h5',
        'failsubmit':                     '.login-container .login-error p',
        'text-error':                     '.login-container .form-error span'
    },

    home: 
    {
        'welcome':                        '.welcome-section h1',
        'logout':                         '.logout-btn'
    },

    profile: 
    {
        'icon':                           'a .user-pic img',
        'image':                          'main > div:first-child img',
        'toast-s':                        '.toast',
        'toast-msg':                      '.toast-body p',
        'toast-close':                    '.toast-header i',
        'prompt':                         'div.modal-inner',
        'yesbtn':                         'div.modal-inner .btn-success',

        general: 
        {                       
            'tab':                        '.tabContainer a:first-child',
            'container':                  '.page main > div:last-child',
            'fullname':                   '#full_name',
        },

        security: 
        {
            'tab':                        '.tabContainer a:nth-child(2)',
            'current-pass':               '#current_password',
            'new-pass':                   '#new_password',
            'confirm-pass':               '#confirm_password',
            'update-btn':                 '.btn-success',
            'error-msg':                  '.form-error span',
            'current-error':              '.mt-4 > div:first-child .form-error span',
            'new-error':                  '.mt-4 > div:nth-child(2) .form-error span',
            'confirm-error':              '.mt-4 > div:last-child .form-error span'

        },

        activity: 
        {
            'tab':                        '.tabContainer a:last-child',
            'table':                      '#tableBody',
            'tableBody':                  'div:nth-child(3) .table-auto',
            'entry':                      'select.outline-none',
            'preloader':                  '.preloader img',
            'rows':                       '#tableBody tr',
            'total':                      '.table-showing span:last-child',
            'summaryTable':               '.table-auto.table-custom.min-w-full.table-lg',
            'summaryRows':                '.table-auto.table-custom.min-w-full.table-lg tr'
        }

    },
    
    report: 
    {
        'report':                         '.nav-container:nth-of-type(1) span',
        'container':                      '.nav-container:nth-child(1)',
        'text-head':                      'h1.page-header-title',
        'betting-history':                '.nav-container:nth-of-type(1) a:nth-child(1)',
        'transfer-history':               '.nav-container:nth-of-type(1) a:nth-child(2)',
        'player-cashflow':                '.nav-container:nth-of-type(1) a:nth-child(3)',
        'promo-report':                   '.nav-container:nth-of-type(1) a:nth-child(4)',
        'game-report':                    '.nav-container:nth-of-type(1) a:nth-child(5)',
        'opSum-daily':                    '.nav-container:nth-of-type(1) a:nth-child(6)',
        'opSum-monthly':                  '.nav-container:nth-of-type(1) a:nth-child(7)',
        'vendor-summary':                 '.nav-container:nth-of-type(1) a:nth-child(8)',
        'player-summary':                 '.nav-container:nth-of-type(1) a:nth-child(9)',
        'sports-betting':                 '.nav-container:nth-of-type(1) a:nth-child(10)',
        
        filter:
        {
            'search':                     'button[type="submit"]',
            'reset':                      'button[type="reset"]',
            'transaction-date':           '.form_inputs:first-of-type .dp__input_wrap input',
            'credit-date':                '.form_inputs:nth-child(2) .dp__input_wrap input',
            'date-modal':                 'div.dp__menu',
            'today':                      'div.items-start:nth-child(1) .presetDatesLabel',
            'yesterday':                  'div.items-start:nth-child(2) .presetDatesLabel',
            'this-week':                  'div.items-start:nth-child(3) .presetDatesLabel',
            'last-week':                  'div.items-start:nth-child(4) .presetDatesLabel',
            'this-month':                 'div.items-start:nth-child(5) .presetDatesLabel',
            'last-month':                 'div.items-start:nth-child(6) .presetDatesLabel',
            'two-months-ago':             'div.items-start:nth-child(7) .presetDatesLabel',
            'dpClear':                    '.dp__icon.dp__clear_icon.dp__input_icons',
            'operator':                   'div.form_inputs:nth-child(2) input',
            'operator1':                   'div.form_inputs:nth-child(3) input',
            'operator-dropdown':          'div.ant-select-dropdown',
            'operator-name':              'div.filter-node .ant-select-tree-title',
            'parent-operator':            '.ant-select-tree-treenode:nth-of-type(1) .anticon',
            'transactionId':              '#transaction_id',
            'playerId':                   '#player_id',
            'gameName':                   '#game_name',
            'roundId':                    '#game_round',
            'gameId':                     '#game_id',
            'gameCode':                   '#game_code',
            'promoName':                  '#promo_name',
            'export':                     '.fa-file-export',
            'bell':                       'button[type="button"][id="bellBtn"]',
            'notif':                      '#notifBox .dropdown-body a:first-of-type',
            'pop-up':                     '.toast.toast-success',
            'pop-up-head':                '.toast.toast-success .toast-header',
            'pop-up-body':                '.toast.toast-success .toast-body',
            'form':                       '.form_inputs',
            'summary-accordion':          '.toggle-summary-table-btn'
        },

        table1: {
            'playerId':                   '#tableBody > tr:first-child > td:nth-child(6)',
            'transactionId':              '#tableBody > tr:first-child > td:nth-child(4)',
            'gameName':                   '#tableBody > tr:first-child > td:nth-child(21)',
            'roundId':                    '#tableBody > tr:first-child > td:nth-child(12)',
            'gameId':                     '#tableBody > tr:first-child > td:nth-child(19)'
        },

        table2: {
            'transactionId':              '#tableBody > tr:first-child > td:nth-child(3)',
            'playerId':                   '#tableBody > tr:first-child > td:nth-child(6)'
        },

        table3: {
            'playerId':                   '#tableBody > tr:first-child > td:nth-child(6)',
            'promoName':                  '#tableBody > tr:first-child > td:nth-child(3)',
            'transactionId':              '#tableBody > tr:first-child > td:nth-child(7)'
        },

        table4: {
            'gameId':                     '#tableBody > tr:first-child > td:nth-child(4)',
            'gameName':                   '#tableBody > tr:first-child > td:nth-child(6)',
            'gameCode':                   '#tableBody > tr:first-child > td:nth-child(5)'
        },

        table5: {
            'gameId':                     '#tableBody > tr:first-child > td:nth-child(6)',
            'gameName':                   '#tableBody > tr:first-child > td:nth-child(7)',
            'gameCode':                   '#tableBody > tr:first-child > td:nth-child(8)'
        },

        table6: {
            'playerId':                   '#tableBody > tr:first-child > td:nth-child(6)',
            'gameId':                     '#tableBody > tr:first-child > td:nth-child(7)',
            'gameName':                   '#tableBody > tr:first-child > td:nth-child(9)',
            'gameCode':                   '#tableBody > tr:first-child > td:nth-child(10)'
        },

        table7: {
            'transactionId':              '#tableBody > tr:first-child > td:nth-child(6)',
            'playerId':                   '#tableBody > tr:first-child > td:nth-child(5)'
        },

        summaryTable:
        {
            '1stcol':                     '.table-auto.table-custom.min-w-full.table-lg tr:first-child th:nth-child(1)',
            '2ndcol':                     '.table-auto.table-custom.min-w-full.table-lg tr:first-child th:nth-child(2)',
            '3rdcol':                     '.table-auto.table-custom.min-w-full.table-lg tr:first-child th:nth-child(3)',
            '4thcol':                     '.table-auto.table-custom.min-w-full.table-lg tr:first-child th:nth-child(4)',
            '5thcol':                     '.table-auto.table-custom.min-w-full.table-lg tr:first-child th:nth-child(5)',
            '6thcol':                     '.table-auto.table-custom.min-w-full.table-lg tr:first-child th:nth-child(6)',
            '7thcol':                     '.table-auto.table-custom.min-w-full.table-lg tr:first-child th:nth-child(7)',
            '8thcol':                     '.table-auto.table-custom.min-w-full.table-lg tr:first-child th:nth-child(8)',
            '9thcol':                     '.table-auto.table-custom.min-w-full.table-lg tr:first-child th:nth-child(9)',
            '10thcol':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child th:nth-child(10)',
            
            dataTable1:
            {
                '1stdata':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(1)',
                '2nddata':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(2)',
                '3rddata':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(3)',
                '4thdata':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(4)',
                '5thdata':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(5)',
                '6thdata':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(6)',
                '7thdata':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(7)'
            },

            dataTable2:
            {
                '1stdata':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(1)',
                '2nddata':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(2)',
                '3rddata':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(3)'
            },

            dataTable3:
            {
                '1stdata':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(1)',
                '2nddata':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(2)',
                '3rddata':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(3)',
                '4thdata':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(4)',
                '5thdata':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(5)'
            },

            dataTable4:
            {
                '1stdata':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(1)',
                '2nddata':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(2)',
                '3rddata':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(3)',
                '4thdata':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(4)',
                '5thdata':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(5)',
                '6thdata':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(6)',
                '7thdata':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(7)',
                '8thdata':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(8)',
                '9thdata':                    '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(9)',
                '10thdata':                   '.table-auto.table-custom.min-w-full.table-lg tr:first-child td:nth-child(10)'
            }
        }

    },

    content:
    {
        'content':                             '.nav-container:nth-of-type(2) span',
        'container':                           '.nav-container:nth-child(2)',
        'player':                              '.nav-container:nth-of-type(2) a:nth-child(1)',
        'operator':                            '.nav-container:nth-of-type(2) a:nth-child(2)',
        'vendor':                              '.nav-container:nth-of-type(2) a:nth-child(3)',
        'games':                               '.nav-container:nth-of-type(2) a:nth-child(4)',
        'sub-game':                            '.nav-container:nth-of-type(2) a:nth-child(5)',
        'bet-limit':                           '.nav-container:nth-of-type(2) a:nth-child(6)',
        'currency':                            '.nav-container:nth-of-type(2) a:nth-child(7)',
        'operator-name':                       'input[type="text"][id="operator_id"]',
        'search':                              'button[type="submit"]',
        'add-operator':                        'button.btn.btn-success[type="button"]',
        'vendor':                              '.nav-container:nth-of-type(2) a:nth-child(3)',
        'vendor-name':                         'input[type="text"][id="vendor_name"]',
        'reset':                               'button[type="reset"]',

        filter:
        {
            'search':                     'button[type="submit"]',
            'reset':                      'button[type="reset"]',
            'transaction-date':           '.form_inputs:first-of-type .dp__input_wrap input',
            'credit-date':                '.form_inputs:nth-child(2) .dp__input_wrap input',
            'date-modal':                 'div.dp__menu',
            'today':                      'div.items-start:nth-child(1) .presetDatesLabel',
            'yesterday':                  'div.items-start:nth-child(2) .presetDatesLabel',
            'this-week':                  'div.items-start:nth-child(3) .presetDatesLabel',
            'last-week':                  'div.items-start:nth-child(4) .presetDatesLabel',
            'this-month':                 'div.items-start:nth-child(5) .presetDatesLabel',
            'last-month':                 'div.items-start:nth-child(6) .presetDatesLabel',
            'two-months-ago':             'div.items-start:nth-child(7) .presetDatesLabel',
            'dpClear':                    '.dp__icon.dp__clear_icon.dp__input_icons',
            'operator':                   'div.form_inputs:nth-child(1) input',
            'operator-dropdown':          'div.ant-select-dropdown',
            'operator-name':              'div.filter-node .ant-select-tree-title',
            'parent-operator':            '.ant-select-tree-treenode:nth-of-type(1) .anticon',
            'transactionId':              '#transaction_id',
            'playerId':                   '#player_id',
            'gameName':                   '#game_name',
            'roundId':                    '#game_round',
            'gameId':                     '#game_id',
            'gameCode':                   '#game_code',
            'promoName':                  '#promo_name',
            'export':                     '.fa-file-export',
            'bell':                       'button[type="button"][id="bellBtn"]',
            'notif':                      '#notifBox .dropdown-body a:first-of-type',
            'pop-up':                     '.toast.toast-success',
            'pop-up-head':                '.toast.toast-success .toast-header',
            'pop-up-body':                '.toast.toast-success .toast-body',
            'form':                       '.form_inputs',
            'summary-accordion':          '.toggle-summary-table-btn',
            'sub-operator':                'label[for="checkbox"]',
            'check':                      '#checkbox'
        },

        add_operator:
        {
            'operator-name':                   'input[type="text"][id="operator_name"]',
            'parent-operator':                 'input[type="search"]'
        },
        
        table1: {
            'playerId':                   '#tableBody > tr:first-child > td:nth-child(1)'
        }

    },

    lobby:
    {
        'lobby':                               '.nav-container:nth-of-type(3) span',
        'container':                           '.nav-container:nth-child(3)'
    },

    promotion:
    {
        'promo':                               '.nav-container:nth-of-type(4) span',
        'container':                           '.nav-container:nth-child(4)'
    },

    permission:
    {
        'permission':                          '.nav-container:nth-of-type(5) span',
        'container':                           '.nav-container:nth-child(5)'
    },

    system:
    {
        'system':                              '.nav-container:nth-of-type(6) span',
        'container':                           '.nav-container:nth-child(6)'
    },

    logs:
    {
        'logs':                               '.nav-container:nth-of-type(7) span'
    }
}