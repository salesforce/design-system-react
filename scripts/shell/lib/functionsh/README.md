functionsh
==========

A collection of (mostly) independent functions intended to make Bash scripting a little easier for Bash scripters.


Usage
-----

Below is a list of usages for the various available functions included in this library. The definitions are straight from the documentation in the files themselves. See each file's source for more details.

    __center <line-length> <string>
    __debug [<data_string> [<data_string> [...]]]
    __elog [<data_string> [<data_string> [...]]]
    __error [<data_string> [<data_string> [...]]]
    __get_env [-e]
    __in_args <arg_name> "$@"
    __in_array <needle> <haystack>
    __indent [--char=<char>] <num> <string>
    __is_stdin
    __log [-n] [--file=<path>] [<data_string> [<data_string> [...]]]
    __menu [--prompt=<msg>] <list_item> [<list_item>] ... ] [-k <list_item> [<list_item>] ...]
    __path_append <path> [<target_path_var>]
    __path_prepend <path> [<target_path_var>]
    __path_remove <path> [<target_path_var>]
    __path_to_windows <path>
    __short_ans <prompt>
    __show_tree [<path>]
    __source_all [-vx] [<path>]
    __str_repeat [-n] <string> <num>
    __strip_color_codes [<data_string> [<data_string2> [...]]]
    __strlen <string>
    __to_lower <string>
    __to_upper <string>
    __type_exists [-p | -a | -b | -f | -k] <command>
    __type_exists [-p | -a | -b | -f | -k] <app_name>
    __wait_on [--max-time=<seconds>] <processID> [<wait_message>]
    __yes_no --default=<y|n> <question>
