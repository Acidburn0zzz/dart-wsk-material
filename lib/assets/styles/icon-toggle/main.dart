import "dart:html" as dom;
import "dart:async";

import 'package:logging/logging.dart';
import 'package:console_log_handler/console_log_handler.dart';

import 'package:mdl/mdlcomponets.dart';
import 'package:mdl/mdldemo.dart';

main() {
    configLogging();

    registerAllMdlComponents();

    componentFactory().run().then((_) {
        final MaterialIconToggle toggle = MaterialIconToggle.widget(dom.querySelector("#public-checkbox-1"));
        new Timer.periodic(new Duration(milliseconds: 500), (final Timer timer) {
            toggle.checked = !toggle.checked;
        });
    });
}

void configLogging() {
    hierarchicalLoggingEnabled = false; // set this to true - its part of Logging SDK

    // now control the logging.
    // Turn off all logging first
    Logger.root.level = Level.INFO;
    Logger.root.onRecord.listen(new LogConsoleHandler());
}