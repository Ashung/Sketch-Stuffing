
const ui = {};

ui.dialog = function(title, info) {
    let dialog = COSAlertWindow.alloc().init();
    dialog.setMessageText(title);
    if (info) {
        dialog.setInformativeText(info);
    }
    dialog.addButtonWithTitle('OK');
    dialog.addButtonWithTitle('Cancel');
    return dialog;
};

ui.checkbox = function(status, title) {
    let view = NSButton.alloc().initWithFrame(NSMakeRect(0, 0, 300, 24));
    view.setButtonType(NSSwitchButton);
    view.setTitle(title);
    if (status == true) {
        view.setState(NSOnState);
    } else {
        view.setState(NSOffState);
    }
    return view;
};

ui.label = function(text) {
    let view = NSTextField.alloc().initWithFrame(NSMakeRect(0, 0, 300, 16));
    view.setStringValue(text);
    view.setBezeled(false);
    view.setDrawsBackground(false);
    view.setEditable(false);
    view.setSelectable(false);
    return view;
};

ui.input = function(text) {
    let view = NSTextField.alloc().initWithFrame(NSMakeRect(0, 0, 300, 24));
    view.setStringValue(text);
    return view;
};

ui.numberInput = function(text) {
    let view = NSTextField.alloc().initWithFrame(NSMakeRect(0, 0, 60, 24));
    let formatter = NSNumberFormatter.alloc().init().autorelease();
    formatter.setNumberStyle(NSNumberFormatterNoStyle);
    view.setFormatter(formatter);
    view.setStringValue(String(text));
    return view;
};

ui.popupButton = function(items) {
    let view = NSPopUpButton.alloc().initWithFrame(NSMakeRect(0, 0, 300, 24));
    items.forEach(item => {
        view.addItemWithTitle('');
        view.lastItem().setTitle(item);
    });
    return view;
};

ui.stepper = function(min, max, defaultValue) {
    let view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 24));
    let input = NSTextField.alloc().initWithFrame(NSMakeRect(0, 0, 60, 24));
    input.setEditable(false);
    input.setStringValue(String(defaultValue));
    let stepper = NSStepper.alloc().initWithFrame(NSMakeRect(68, 0, 16, 24));
    stepper.setMaxValue(max);
    stepper.setMinValue(min);
    stepper.setValueWraps(false);
    stepper.setAutorepeat(true);
    stepper.setIntegerValue(defaultValue);
    view.addSubview(input);
    view.addSubview(stepper);
    stepper.setCOSJSTargetFunction(sender => {
        input.setStringValue(String(sender.integerValue()));
    });
    return view;
};

module.exports = ui;