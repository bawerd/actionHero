  exports['generate'] = function(binary, next){

  //////// DOCUMENTS ////////

  var documents = {};

  documents.projectMap = "/\n\
  |- actions\n\
  |-- (your actions)\n\
  |\n\
  |- certs\n\
  |-- (your https certs for your domain)\n\
  |\n\
  |- initializers\n\
  |-- (any additional initializers you want)\n\
  |\n\
  |- log\n\
  |-- (default location for logs)\n\
  |\n\
  |- node_modules\n\
  |-- (your modules, actionHero should be npm installed in here)\n\
  |\n\
  |- initializers\n\
  |-- (your initializers, to be loaded in before the project boots)\n\
  |\n\
  |- pids\n\
  |-- (pidfiles for your running servers)\n\
  |\n\
  |- public\n\
  |-- (your static assets to be served by /file)\n\
  |\n\
  |- tasks\n\
  |-- (your tasks)\n\
  |\n\
  | readme.md\n\
  | routes.js\n\
  | config.js\n\
  | package.json (be sure to include 'actionHero':'x')\n\
  ";

  documents.config_js = binary.fs.readFileSync(binary.paths.actionHero_root + "/config.js");
  documents.package_json = binary.fs.readFileSync(binary.paths.actionHero_root + "/package.json");
  documents.routes_js = binary.fs.readFileSync(binary.paths.actionHero_root + "/routes.js");
  documents.action_actions_view = binary.fs.readFileSync(binary.paths.actionHero_root + "/actions/actionsView.js");
  documents.action_status = binary.fs.readFileSync(binary.paths.actionHero_root + "/actions/status.js");
  documents.action_chat = binary.fs.readFileSync(binary.paths.actionHero_root + "/actions/chat.js");
  documents.task_runAction = binary.fs.readFileSync(binary.paths.actionHero_root + "/tasks/runAction.js");
  documents.public_actionHeroWebSocket = binary.fs.readFileSync(binary.paths.actionHero_root + "/public/javascript/actionHeroWebSocket.js");

  var AHversionNumber = JSON.parse(documents.package_json).version;

  documents.package_json = "{\n\
    \"author\": \"YOU <YOU@example.com>\",\n\
    \"name\": \"my_actionHero_project\",\n\
    \"description\": \"\",\n\
    \"version\": \"0.0.1\",\n\
    \"homepage\": \"\",\n\
    \"repository\": {\n\
      \"type\": \"\",\n\
      \"url\": \"\"\n\
    },\n\
    \"main\": \"app.js\",\n\
    \"keywords\": \"\",\n\
    \"engines\": {\n\
      \"node\": \">=0.6.0\"\n\
    },\n\
    \"dependencies\": {\n\
      \"actionHero\": \""+AHversionNumber+"\"\n\
    },\n\
    \"devDependencies\": {},\n\
    \"scripts\": {\n\
      \"start\": \"node ./node_modules/.bin/actionHero start\",\n\
      \"startCluster\": \"node ./node_modules/.bin/actionHero startCluster\",\n\
      \"actionHero\": \"node ./node_modules/.bin/actionHero\",\n\
      \"help\": \"node ./node_modules/.bin/actionHero help\"\n\
    }\n\
  }\n\
  ";

  documents._project_js = "exports._project = function(api, next){\n\
  // modify / append the api global variable\n\
  // I will be run as part of actionHero\'s boot process\n\
\n\
  next();\n\
}\
";

  documents.readme_md = "# My actionHero Project\nreadme"; 

  documents.index_html = "<h1>Hello from actionHero!</h1>\n\
  <p>If you are reading this, your actionHero project is working.</p>\n\
  <p><strong>Good Job!</strong></p>\n\
  ";

  //////// LOGIC ////////

  binary.log("Generating a new actionHero project...");

  // make directories
  binary.utils.create_dir_safely(binary.paths.project_root + "/actions");
  binary.utils.create_dir_safely(binary.paths.project_root + "/pids");
  binary.utils.create_dir_safely(binary.paths.project_root + "/certs");
  binary.utils.create_dir_safely(binary.paths.project_root + "/initializers");
  binary.utils.create_dir_safely(binary.paths.project_root + "/log");
  binary.utils.create_dir_safely(binary.paths.project_root + "/public");
  binary.utils.create_dir_safely(binary.paths.project_root + "/servers");
  binary.utils.create_dir_safely(binary.paths.project_root + "/public/javascript");
  binary.utils.create_dir_safely(binary.paths.project_root + "/tasks");

  // make files
  binary.utils.create_file_safely(binary.paths.project_root + '/config.js', documents.config_js);
  binary.utils.create_file_safely(binary.paths.project_root + '/routes.js', documents.routes_js);
  binary.utils.create_file_safely(binary.paths.project_root + '/package.json', documents.package_json);
  binary.utils.create_file_safely(binary.paths.project_root + '/actions/actionsView.js', documents.action_actions_view);
  binary.utils.create_file_safely(binary.paths.project_root + '/actions/status.js', documents.action_status);
  binary.utils.create_file_safely(binary.paths.project_root + '/actions/chat.js', documents.action_chat);
  binary.utils.create_file_safely(binary.paths.project_root + '/tasks/runAction.js', documents.task_runAction);
  binary.utils.create_file_safely(binary.paths.project_root + '/initializers/_project.js', documents._project_js);
  binary.utils.create_file_safely(binary.paths.project_root + '/public/index.html', documents.index_html);
  binary.utils.create_file_safely(binary.paths.project_root + '/public/javascript/actionHeroWebSocket.js', documents.public_actionHeroWebSocket);
  binary.utils.create_file_safely(binary.paths.project_root + '/readme.md', documents.readme_md);

  binary.log("");
  binary.log("Generation Complete.  Your project directory should look like this:\n" + documents.projectMap);
  binary.log("");
  binary.log("run `./node_modules/.bin/actionHero start` to start your server");

  next();

}