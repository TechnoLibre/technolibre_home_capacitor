#!/usr/bin/env bash

if [ -z "$1" ]; then
  PLATFORM="android"
else
  PLATFORM="$1"
fi

red="\033[0;31m"
green="\033[0;32m"
yellow="\033[0;33m"
blue="\033[0;34m"
magenta="\033[0;35m"
cyan="\033[0;36m"
clear="\033[0m"

PROJET_PATH="project-path.txt"
# Change directory to project-path
project_path_content=$(cat $PROJET_PATH) || {
  echo -e "${red}Error: Could not open file PROJET_PATH${clear}"
  exit 1
}

if [ ! -d "$project_path_content" ]; then {
  echo ng new "$project_path_content" --style=scss --ssr=false
  printf "\n"
  ng new "$project_path_content" --style=scss --ssr=false
  } || {
    echo -e "${red}Error: ng new "$project_path_content" --style=scss --ssr=false${clear}"
    exit 1
  }
fi

cd "$project_path_content" || {
  echo -e "${red}Error: Could not change to directory $directory${clear}"
  exit 1
}

ng add @capacitor/angular || {
  echo -e "${red}Error: Could not add capacitor to the Angular app${clear}"
  exit 1
}

printf "\n"
echo npm i @capacitor/$PLATFORM
npm i @capacitor/$PLATFORM

printf "\n"
echo npx cap add $PLATFORM
printf "\n"
npx cap add $PLATFORM && {
  printf "\n"
  echo -e "Created ${magenta}$project_path_content${clear} successfully. To change variables like ${green}appId${clear} and ${green}appName${clear}, head to ${cyan}capacitor.config.ts${clear} in the ${magenta}$project_path_content${clear} folder."
  printf "\n"
  echo -e "In newer versions of ${magenta}Angular${clear}, the build folder ${blue}dist${clear} puts the application files in another subfolder called ${blue}browser${clear} by default. As this is being written, Capacitor has not taken this into account."
  printf "\n"
  echo -e "Therefore, the command ${green}npx cap sync${clear} will fail if changes are not made manually. The easiest way to fix this is to add ${green}\"/browser\"${clear} at the end of the ${green}webDir${clear} configuration value in ${cyan}capacitor.config.ts${clear}."
  printf "\n"
  echo -e "Alternatively, you can change the output folder configuration in ${yellow}angular.json${clear} by using the method shown in this StackOverflow answer: ${cyan}https://stackoverflow.com/a/78845873${clear}."
  printf "\n"
  echo -e "The variable to change is called ${green}outputPath${clear} and it is found in ${yellow}projects > $project_path_content > architect > build > options${clear}. The StackOverflow answer changes the variable from a string to an object with configurable options, one of which allows you to remove the ${blue}browser${clear} subfolder from the build hierarchy."
  printf "\n"
  echo -e "Make sure to use only one of the two solutions, otherwise, you will end up with the same error."
} || {
  echo -e "${red}Error: Could not add the $PLATFORM platform${clear}"
}