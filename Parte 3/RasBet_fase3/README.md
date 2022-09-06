# RasBet

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* Maven
* MySql
* Node js
* JAVA_HOME ambient var set to jdk 16+

### Installation

1. Create *rasbet* database with *schemaScript*
2. Clone the repo
3. Run maven project at ../RasBet/RasBet
   ```sh
   mvn package
   ```
4. Edit *application.properties* at ./target/RasBet-0.0.1-SNAPSHOT/config
5. Run application fat jar
   ```sh
   cd ./target/RasBet-0.0.1-SNAPSHOT
   ```
   ```sh
   java -jar .\RasBet-0.0.1-SNAPSHOT.jar
   ```
6. At RasBet/RasBet/rasbetfrontend/ run
   ```sh
   npm i
   ```
7. Finally, at RasBet/RasBet/rasbetfrontend/ run
   ```sh
   npm start
   ```
