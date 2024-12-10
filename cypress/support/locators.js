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
            'entry':                      'select.outline-none',
            'preloader':                  '.preloader img',
            'rows':                       '#tableBody tr',
            'total':                      '.table-showing span:last-child'
        }

    },
    
    report: 
    {
        'report':                         '.nav-container:nth-of-type(1) span',
        'container':                     '.nav-container:nth-child(1)',
        'betting-history':                '.nav-container:nth-of-type(1) a:nth-child(1)',
        'transfer-history':               '.nav-container:nth-of-type(1) a:nth-child(2)',
        'player-cashflow':                '',
        'promo-report':                   '',
        'game-report':                    '',
        'operator-summary':               '',
        'vendor-summary':                 '',
        'player-summary':                 '',
        'sports-betting':                 '',
        
        filter:
        {
            'search':                     'button[type="submit"]',
            'reset':                      'button[type="reset"]',
            'transaction-date':           '.form_inputs:first-of-type .dp__input_wrap input',
            'date-picker':             'form .form_inputs:first-child .dp__input_wrap',
            'date-modal':                 'div.dp__menu',
            'yesterday':                  'div.items-start:nth-child(2) .presetDatesLabel',
            'last-month':                 'div.items-start:nth-child(6) .presetDatesLabel',
            'operator':                   'div.form_inputs:nth-child(2) input',
            'operator-dropdown':          'div.ant-select-dropdown',
            'operator-name':              'div.filter-node .ant-select-tree-title',
            'parent-operator':            '.ant-select-tree-treenode:nth-of-type(1) .anticon',
            'transactionId':              '#transaction_id',
            'playerId':                   '#player_id',
            'gameName':                   '#game_name',
            'roundId':                    '#game_round',
            'gameId':                     '#game_id',
            'export':                     '.fa-file-export',
            'bell':                       'button[type="button"][id="bellBtn"]',
            'notif':                      '#notifBox .dropdown-body a:first-of-type',
            'pop-up':                     '.toast.toast-success'
        },

        table: {
            'transactionId':              '#tableBody > tr:first-child > td:nth-child(4)',
            'playerId':                   '#tableBody > tr:first-child > td:nth-child(6)',
            'gameName':                   '#tableBody > tr:first-child > td:nth-child(21)',
            'roundId':                    '#tableBody > tr:first-child > td:nth-child(12)',
            'gameId':                     '#tableBody > tr:first-child > td:nth-child(19)'
        }

    },

    content:
    {
        'content':                             '.nav-container:nth-of-type(2) span',
        'container':                           '.nav-container:nth-child(2)',
        'operator':                            '.nav-container:nth-of-type(2) a:nth-child(2)',
        'operator-name':                       'input[type="text"][id="operator_id"]',
        'search':                              'button[type="submit"]',
        'add-operator':                        'button.btn.btn-success[type="button"]',
        'vendor':                              '.nav-container:nth-of-type(2) a:nth-child(3)',
        'vendor-name':                         'input[type="text"][id="vendor_name"]',
        'reset':                                'button[type="reset"]',

        add_operator:
        {
            'operator-name':                   'input[type="text"][id="operator_name"]',
            'parent-operator':                 'input[type="search"]'
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