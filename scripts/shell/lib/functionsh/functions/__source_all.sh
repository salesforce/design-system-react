## /* @function
 #  @usage __source_all [-vx] [<path>]
 #
 #  @output true (for -v)
 #
 #  @description
 #  This function will source all files in the given <path>, bringing any
 #  exported variables into the calling context. Given folders are searched
 #  recursively. If no <path> is provided, the current directory is sourced.
 #  Because of this, be very intentional about how you use this function.
 #  description@
 #
 #  @options
 #  -x      If the sourced files contains a single function, export each function.
 #  -v      Output number of functions/files exported (e.g. "3 functions exported").
 #  options@
 #
 #  @notes
 #  - The given <path> can be handled whether it ends with a slash (/) or not.
 #  - The given <path> can be relative to the current directory or absolute.
 #  notes@
 #
 #  @examples
 #  __source_all "/some/path/to/folder"
 #  examples@
 #
 #  @returns
 #  0 - successful execution
 #  1 - given <path> is not a directory
 #  returns@
 #
 #  @file functions/__source_all.sh
 ## */

function __source_all {
    local retVal=0 sCount=0 xCount=0 showCount= exportFuncs=
    local grepped fName arg sPath

    # parse arguments
    __in_args v "$@" && showCount=true
    # echo "_args_clipped: $_args_clipped"
    __in_args x "${_args_clipped[@]}" && exportFuncs=true

    sPath="${_args_clipped[@]}"
    [ -z "$sPath" ] && arg=$( pwd ) || arg="${sPath%/}"
    # echo "showCount: $showCount";
    # echo "exportFuncs: $exportFuncs";
    # echo "arg: $arg";

    # validate directory and start sourcing
    if [ -d "$arg" ]; then
        for file in "${arg}/"*; do

            if [ -d "$file" ]; then
                export sCount
                __source_all "$file"

            elif [ -s "$file" ]; then
                echo "Going to source: ${file}"
                source "$file"
                (( sCount++ ))

                if [ $exportFuncs ]; then
                    grepped=$( grep '^function' "$file" )
                    echo "grepped = $grepped"

                    if [ -n "$grepped" ]; then
                        fName="${grepped#* }"
                        fName="${fName% *}"
                        fName="${fName%(*}"
                        echo "fName = $fName"

                        if egrep -qi '^[-_.a-z0-9]+$' <<< "$fName" && __type_exists -f "$fName"; then
                            eval export -f "$fName"
                            (( xCount++ ))
                        fi
                    fi
                fi
            fi

        done

    else
        retVal=1
    fi

    [ $showCount ] && echo "${sCount} files sourced" && echo "${xCount} functions exported"
    unset xCount sCount

    return $retVal
}
export -f __source_all
