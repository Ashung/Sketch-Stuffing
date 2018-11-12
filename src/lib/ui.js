const date = require('./date');

const ui = {};

ui.dialog = function(title, info) {
    let dialog = COSAlertWindow.alloc().init();
    dialog.setMessageText(title);
    if (info) {
        dialog.setInformativeText(info);
    }
    dialog.addButtonWithTitle('确定');
    dialog.addButtonWithTitle('取消');
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

ui.text = function(text) {
    let view = NSTextField.alloc().initWithFrame(NSMakeRect(0, 0, 300, 16));
    view.setStringValue(text);
    view.setBezeled(false);
    view.setDrawsBackground(false);
    view.setEditable(false);
    view.setSelectable(false);
    return view;
};

ui.label = function(text) {
    let view = this.text(text);
    view.setFont(NSFont.boldSystemFontOfSize(12));
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

ui.button = function(text, width) {
    if (!width) {
        width = 60;
    }
    let view = NSButton.alloc().initWithFrame(NSMakeRect(0, 0, width, 24));
    view.setBezelStyle(NSRoundedBezelStyle);
    view.setTitle(text);
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
    let stepper = NSStepper.alloc().initWithFrame(NSMakeRect(0, 0, 16, 24));
    stepper.setMaxValue(max);
    stepper.setMinValue(min);
    stepper.setValueWraps(true);
    stepper.setAutorepeat(true);
    stepper.setIntegerValue(defaultValue);
    return stepper;
};

ui.stepperWithTextField = function(stepper, width) {
    if (!width) {
        width = 40;
    }
    let view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 24));
    let input = NSTextField.alloc().initWithFrame(NSMakeRect(0, 0, width, 24));
    input.setEditable(false);
    input.setStringValue(String(stepper.integerValue()));
    stepper.setFrame(NSMakeRect(width + 2, 0, 16, 24));
    stepper.setCOSJSTargetFunction(sender => {
        input.setStringValue(String(sender.integerValue()));
    });
    view.addSubview(input);
    view.addSubview(stepper);
    return view;
};

ui.stepperGroupWithThreeChild = function(stepperWithTextFields, labels) {
    let view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 24));
    stepperWithTextFields.forEach((item, i) => {
        let label = ui.text(labels[i]);
        label.setFrame(NSMakeRect(i * 100, 0, 20, 20));
        view.addSubview(label);
        item.setFrame(NSMakeRect(i * 100 + 20, 0, 80, 24));
        view.addSubview(item);
    });
    return view;
};

ui.datePicker = function(timestamp) {
    let datePicker = NSDatePicker.alloc().initWithFrame(NSMakeRect(0, 0, 300, 24));
    datePicker.setDatePickerStyle(NSTextFieldAndStepperDatePickerStyle);
    datePicker.setDrawsBackground(true);
    datePicker.setBackgroundColor(NSColor.whiteColor());
    datePicker.setDatePickerMode(NSSingleDateMode);
    let defaultDate;
    if (timestamp) {
        defaultDate = date.timestampToNsDate(timestamp);
    }
    else {
        defaultDate = NSDate.date();
    }
    datePicker.setDateValue(defaultDate);
    return datePicker;
};

ui.datePickerWithResetButton = function(datePicker) {
    let view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 24));
    datePicker.setFrame(NSMakeRect(0, 0, 200, 24));
    let resetButton = this.button('今日');
    resetButton.setFrame(NSMakeRect(200, -2, 60, 24));
    resetButton.setCOSJSTargetFunction(sender => {
        datePicker.setDateValue(NSDate.date());
    });
    view.addSubview(datePicker);
    view.addSubview(resetButton);
    return view;
};

module.exports = ui;