## /* @function
 #  @usage __in_array <needle> <haystack>
 #
 #  @output false
 #
 #  @exports
 #  $_in_array_index
 #  exports@
 #
 #  @description
 #  This function will search an array (<haystack>) for a given value (<needle>).
 #  It will return SUCCESS if the *exact* value is found in the array. Furthermore,
 #  a variable will be set and available to the calling script.
 #
 #  The way this function parses the arguments allows for either a whitespace-
 #  separated list OR an array (e.g. ${myArray[@]}) surrounded with double quotes
 #  to be passed as the haystack and it will still function as expected.
 #  Essentially the first parameter is used as the needle and any additional will
 #  be considered "in the haystack."
 #  description@
 #
 #  @notes
 #  - This function is meant to be used in conditionals. Do NOT test for the
 #  existence of the exported variable in your code. If the function returns
 #  true, the value will exist.
 #  - When viewing the examples below, keep in mind that Bash arrays are 0-based.
 #  notes@
 #
 #  @examples
 #  list="just a small list"
 #  arr=( "just a" "small list" )
 #
 #  __in_array "list" $list              # returns 0 (success) and sets
 #                                       # $_in_array_index=3
 #  __in_array "list" "$list"            # returns 2 (failure). $list is now seen as
 #                                       #   a single parameter
 #  __in_array "list" ${arr[@]}          # returns 2. array values spread out and are
 #                                       #   considered a whitespace-separated list
 #  __in_array "list" "${arr[@]}"        # returns 0 and sets $_in_array_index=1
 #
 #  # use only in conditionals thusly:
 #  if __in_array "small" "${arr[@]}"; then
 #      echo "small's index is: $_in_array_index"
 #  fi
 #  examples@
 #
 #  @dependencies
 #  `egrep`
 #  dependencies@
 #
 #  @returns
 #  0 - needle was found in the haystack
 #  1 - less than 2 args were passed to this function
 #  2 - needle not found in haystack
 #  returns@
 #
 #  @file functions/__in_array.sh
 ## */

function __in_array {
    [ $# -lt 2 ] && return 1

    # use first param as needle and sandwich the rest as the haystack
    declare -a arr
    local needle="$1" i

    shift

    until [ -z "$1" ]; do
        arr[$i]="$1"
        (( i++ ))
        shift
    done

    # reset the exported variable before use
    _in_array_index=""
    for (( i = 0 ; i < ${#arr[@]} ; i++ )); do
        if echo "$needle" | egrep -q "^${arr[$i]}\$"; then
            export _in_array_index=$i
            return 0
        fi
    done

    return 2
}
export -f __in_array
