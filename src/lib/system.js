const system = {};

system.chooseFile = function() {
    let panel = NSOpenPanel.openPanel();
    panel.setCanChooseDirectories(false);
    panel.setCanChooseFiles(true);
    panel.setCanCreateDirectories(false);
    panel.setAllowedFileTypes(['txt']);
    if (panel.runModal() == NSOKButton) {
        return panel.URL().path();
    }
};

system.chooseFolder = function() {
    let panel = NSOpenPanel.openPanel();
    panel.setCanChooseDirectories(true);
    panel.setCanChooseFiles(false);
    panel.setCanCreateDirectories(false);
    if (panel.runModal() == NSOKButton) {
        return panel.URL().path();
    }
};

system.textsFromFile = function(path) {
    let contents = NSString.stringWithContentsOfFile_encoding_error(path, NSUTF8StringEncoding, nil);
    let data = contents.componentsSeparatedByCharactersInSet(NSCharacterSet.newlineCharacterSet());
    let texts = [];
    let loopData = data.objectEnumerator();
    let item;
    while (item = loopData.nextObject()) {
        if (item.length() > 0) {
            texts.push(String(item));
        }
    }
    return texts;
};

system.imagesFromFolder = function(path) {
    let images = [];
    let supportFormats = ['png', 'jpg', 'jpeg', 'tif', 'tiff', 'gif', 'webp', 'bmp'];
    let fileManager = NSFileManager.defaultManager();
    let fileList = fileManager.contentsOfDirectoryAtPath_error(path, nil);
    fileList = fileList.sortedArrayUsingSelector("localizedStandardCompare:");
    fileList.forEach(function(file) {
        if (supportFormats.indexOf(String(file.pathExtension().lowercaseString())) != -1) {
            images.push(path + '/' + file);
        }
    });
    return images;
};

system.textsFromChooseFile = function() {
    var textFile = system.chooseFile();
    if (textFile == nil) {
        return [];
    } else {
        return this.textsFromFile(textFile);
    }
};

system.imagesFromChooseFolder = function() {
    var imageFolder = system.chooseFolder();
    if (imageFolder == nil) {
        return [];
    } else {
        return this.imagesFromFolder(imageFolder);
    }
};

module.exports = system;