## /* @function
 #  @usage __get_env [-e]
 #
 #  @output true (with -e option)
 #
 #  @exports
 #  $_ENV_UNIX
 #  $_ENV_LINUX
 #  $_ENV_OSX
 #  $_ENV_WINDOWS
 #  $_ENV_CYGWIN
 #  $_ENV_MSYSGIT
 #  $_ENV_OTHER
 #  $_ENV_SUMMARY
 #  exports@
 #
 #  @description
 #  This is a simple function to figure out what sort of system the user is running.
 #  These exported variables can then be used for system-agnostic scripts. The
 #  variables are either deinitialized or set to true in order to make them perfect
 #  for conditionals.
 #  description@
 #
 #  @options
 #  -e      Output the value of $_ENV_SUMMARY (e.g. unix-osx)
 #  options@
 #
 #  @notes
 #  - Each exported variable is reset on each run of this function. If it fails,
 #  any conditional which uses the exported variables will necessarily fail.
 #  notes@
 #
 #  @examples
 #  __get_env
 #
 #  if [ $_ENV_OSX ]; then
 #      say "I am on teh b3st 0S!"
 #  fi
 #  examples@
 #
 #  @dependencies
 #  `uname`
 #  dependencies@
 #
 #  @returns
 #  0 - successful execution
 #  1 - `uname` cannot be found
 #  returns@
 #
 #  @file functions/__get_env.sh
 ## */

function __get_env {
    local retVal=0

    # get uname info
    _ENV_UNAME=$(which uname &> /dev/null && uname -s)

    # Unix-y vars
    _ENV_UNIX=
    _ENV_LINUX=
    _ENV_OSX=

    # Windows-y vars
    _ENV_WINDOWS=
    _ENV_CYGWIN=
    _ENV_MSYSGIT=

    # var that will be echoed if -e is passed. if it's already been set, just echo it.
    _ENV_SUMMARY=
    _ENV_OTHER=

    if [ -z "$_ENV_UNAME" ]; then
        retVal=1

    else
        case $_ENV_UNAME in
            Linux*)
                _ENV_UNIX=true
                _ENV_LINUX=true
                _ENV_SUMMARY="unix-linux"
                ;;

            Darwin*)
                _ENV_UNIX=true
                _ENV_OSX=true
                _ENV_SUMMARY="unix-osx"
                ;;

            CYGWIN*)
                _ENV_WINDOWS=true
                _ENV_CYGWIN=true
                _ENV_SUMMARY="windows-cygwin"
                ;;

            MINGW32*)
                _ENV_WINDOWS=true
                _ENV_MSYSGIT=true
                _ENV_SUMMARY="windows-msysgit"
                ;;

            *)
                _ENV_OTHER=true
                _ENV_SUMMARY="other"
                ;;
        esac

        if [ "$1" = "-e" ]; then
            echo $_ENV_SUMMARY
        fi
    fi

    export _ENV_UNIX _ENV_LINUX _ENV_OSX
    export _ENV_WINDOWS _ENV_CYGWIN _ENV_MSYSGIT
    export _ENV_SUMMARY _ENV_OTHER

    return $retVal
}
export -f __get_env
