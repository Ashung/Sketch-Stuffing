
var utli = {};

utli.randomStringUseCharacters_template = function(chars, template) {};

utli.randomStringUseChars_length = function(chars, length) {
    var result = "";
    for (var i = 0; i < length; i ++) {
        result += this.randomOne(chars);
    }
    return result;
};

utli.randomIntFromRange = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

utli.randomOne = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

utli.stringRemoveChars = function(string, chars) {
    var result = string;
    for (var i = 0; i < chars.length; i++) {
        result = string.replace(chars[i], "");
    }
    return result;
};

utli.orderedDataFromData_count = function(data, count) {
    return utli.datafromData_count_start_shuffle(data, 0, count, false);
};

utli.orderedDataOffsetFromData_count = function(data, count) {
    var start = Math.floor(Math.random() * data.length);
    return utli.datafromData_count_start_shuffle(data, start, count, false);
};

utli.randomDataFromData_count = function(data, count) {
    return utli.datafromData_count_start_shuffle(data, 0, count, true);
};

utli.datafromData_count_start_shuffle = function(data, start, count, shuffle) {
    var newData = data.slice(start);
    while (newData.length < count) {
        newData.push.apply(newData, data);
    }
    if (shuffle == true) {
        utli.shuffle(newData);
    }
    return newData.splice(0, count);
};

utli.shuffle = function(data) {
    let currentIndex = data.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = data[currentIndex];
        data[currentIndex] = data[randomIndex];
        data[randomIndex] = temporaryValue;
    }
    return data;
};

var sys = {};

sys.chooseFile = function() {
    var panel = NSOpenPanel.openPanel();
    panel.setCanChooseDirectories(false);
    panel.setCanChooseFiles(true);
    panel.setCanCreateDirectories(false);
    panel.setAllowedFileTypes(["txt"]);
    if (panel.runModal() == NSOKButton) {
        return panel.URL().path();
    }
};

sys.chooseFolder = function() {
    var panel = NSOpenPanel.openPanel();
    panel.setCanChooseDirectories(true);
    panel.setCanChooseFiles(false);
    panel.setCanCreateDirectories(false);
    if (panel.runModal() == NSOKButton) {
        return panel.URL().path();
    }
};

sys.textsFromFile = function(path) {
    var contents = NSString.stringWithContentsOfFile_encoding_error(path, NSUTF8StringEncoding, nil);
    var data = contents.componentsSeparatedByCharactersInSet(NSCharacterSet.newlineCharacterSet());
    var texts = [];
    var loopData = data.objectEnumerator();
    var item;
    while (item = loopData.nextObject()) {
        if (item.length() > 0) {
            texts.push(String(item));
        }
    }
    return texts;
};

sys.imagesFromFolder = function(path) {
    var images = [];
    var supportFormats = ["png", "jpg", "jpeg", "tif", "tiff", "gif", "webp", "bmp"];
    var fileManager = NSFileManager.defaultManager();
    var fileList = fileManager.contentsOfDirectoryAtPath_error(path, nil);
    fileList.forEach(function(file) {
        if (supportFormats.indexOf(String(file.pathExtension().lowercaseString())) != -1) {
            images.push(path + "/" + file);
        }
    });
    return images;
};

var ui = {};

ui.dialog = function(title, info) {
    var dialog = COSAlertWindow.alloc().init();
    dialog.setMessageText(title);
    if (info) {
        dialog.setInformativeText(info);
    }
    dialog.addButtonWithTitle("OK");
    dialog.addButtonWithTitle("Cancel");
    return dialog;
};

ui.checkbox = function(status, title) {
    var view = NSButton.alloc().initWithFrame(NSMakeRect(0, 0, 300, 24));
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
    var view = NSTextField.alloc().initWithFrame(NSMakeRect(0, 0, 300, 16));
    view.setStringValue(text);
    view.setBezeled(false);
    view.setDrawsBackground(false);
    view.setEditable(false);
    view.setSelectable(false);
    return view;
};

ui.input = function(text) {
    var view = NSTextField.alloc().initWithFrame(NSMakeRect(0, 0, 300, 24));
    view.setStringValue(text);
    return view;
};

ui.popupButton = function(items) {
    var view = NSPopUpButton.alloc().initWithFrame(NSMakeRect(0, 0, 300, 24));
    items.forEach(function(item) {
        view.addItemWithTitle("");
        view.lastItem().setTitle(item);
    });
    return view;
};

ui.numberInput = function() {
    var view = NSTextField.alloc().initWithFrame(NSMakeRect(0, 0, 60, 24));
    var formatter = NSNumberFormatter.alloc().init().autorelease();
    view.setStringValue(String(initBaselineOffset));
    view.setFormatter(formatter);
    return view;
};

ui.stepper = function(min, max, defaultValue) {
    var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 24));
    var input = NSTextField.alloc().initWithFrame(NSMakeRect(0, 0, 60, 24));
    input.setEditable(false);
    input.setStringValue(String(defaultValue));
    var stepper = NSStepper.alloc().initWithFrame(NSMakeRect(68, 0, 16, 24));
    stepper.setMaxValue(max);
    stepper.setMinValue(min);
    stepper.setValueWraps(false);
    stepper.setAutorepeat(true);
    stepper.setIntegerValue(defaultValue);
    view.addSubview(input);
    view.addSubview(stepper);
    stepper.setCOSJSTargetFunction(function(sender) {
        input.setStringValue(String(sender.integerValue()));
    });
    return view;
};