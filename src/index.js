Ext.require([
    'Ext.form.Panel',
    'Ext.form.FieldSet',
    'Ext.field.Text',
    'Ext.field.Password',
    'Ext.field.Email',
    'Ext.field.Url',
    'Ext.field.Checkbox',
    'Ext.field.Spinner',
    'Ext.field.Select',
    'Ext.field.Hidden',
    'Ext.field.TextArea',
    'Ext.field.Slider',
    'Ext.field.Toggle',
    'Ext.field.Radio',
    'Ext.Button',

    'Ext.data.Store'
]);

Ext.define('User', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'name', type: 'string'},
            {name: 'password', type: 'password'},
            {name: 'disabled', type: 'string'},
            {name: 'email', type: 'string'},
            {name: 'url', type: 'string'},
            {name: 'date', type: 'date'},
            {name: 'number', type: 'integer'},
            {name: 'height', type: 'integer'},
            {name: 'enable', type: 'integer'},
            {name: 'spinner', type: 'integer'},
            {name: 'single_slider'},
            {name: 'multiple_slider'},
            {name: 'rank', type: 'string'},
            {name: 'enable', type: 'boolean'},
            {name: 'cool', type: 'boolean'},
            {name: 'color', type: 'string'},
            {name: 'team', type: 'string'},
            {name: 'secret', type: 'boolean'}
        ]
    }
});

Ext.define('Ranks', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'rank', type: 'string'},
            {name: 'title', type: 'string'}
        ]
    }
});


Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function() {
        var form;
        var ranksStore = Ext.create('Ext.data.Store', {
            data: [
                { rank: 'master', title: 'Master'},
                { rank: 'padawan', title: 'Student'},
                { rank: 'teacher', title: 'Instructor'},
                { rank: 'aid', title: 'Assistant'}
            ],
            model: 'Ranks',
            autoLoad: true,
            autoDestroy: true
        });

        var formBase = {
            url: 'postUser.php',
            standardSubmit: false,
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Personal Info',
                    instructions: 'Please enter the information above.',
                    defaults: {
                        required: true,
                        labelAlign: 'left',
                        labelWidth: '40%'
                    },
                    items: [
                        {
                            xtype: 'sliderfield',
                            name: 'height',
                            label: 'Height'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Single Slider',
                    items: [
                        {
                            xtype: 'sliderfield',
                            name: 'single_slider',
                            plugins: 'sliderfill',
                            value: 60
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Multiple Slider Thumbs',
                    items: [
                        {
                            xtype: 'sliderfield',
                            name: 'multiple_slider',
                            plugins: 'sliderfill',
                            values: [40,60, 90]
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    docked: 'bottom',
                    items: [
                        {
                            text: 'Load Model',
                            ui: 'round',
                            handler: function() {
                                if (!formBase.user) {
                                    var date = new Date();
                                    date.setMonth(4);
                                    date.setYear(1989);
                                    date.setDate(1);

                                    formBase.user = Ext.ModelMgr.create({
                                        
                                        'single_slider': 10,
                                        'multiple_slider': [20, 40,65],
                                        'height': 20
                                    }, 'User');
                                }
                                form.setRecord(formBase.user);
                            }
                        },
                        {
                            text: 'Change Multiple',
                            handler: function() {
                                form.getFields().multiple_slider.setValues([20,40,70]);
                            }
                        },
                        {xtype: 'spacer'},
                        {
                            text: 'Reset',
                            handler: function() {
                                form.reset();
                            }
                        },
                        {
                            text: 'Save',
                            ui: 'confirm',
                            handler: function() {
                                if (formBase.user) {
                                    form.updateRecord(formBase.user, true);
                                }
                                form.submit({
                                    waitMsg: {message: 'Submitting', cls: 'demos-loading'}
                                });
                            }
                        }
                    ]
                }
            ],

            listeners: {
                submit: function(form, result) {
                    console.log('success', Ext.toArray(arguments));
                },
                exception: function(form, result) {
                    console.log('failure', Ext.toArray(arguments));
                }
            }
        };

        if (Ext.os.deviceType == 'Phone') {
            Ext.apply(formBase, {
                xtype: 'formpanel',
                autoRender: true
            });

            form = Ext.Viewport.add(formBase);
        } else {
            Ext.apply(formBase, {
                autoRender: true,
                modal: false,
                hideOnMaskTap: false,
                centered: false,
                fullscreen: true
            });

            form = Ext.create('Ext.form.Panel', formBase);
            form.show();
        }
    }
});
