# Build stage
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY libs/framework-common libs/framework-common
COPY services/whatsapp-service services/whatsapp-service
RUN mvn -f libs/framework-common/pom.xml install
RUN mvn -f services/whatsapp-service/pom.xml clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre
COPY --from=build /app/services/whatsapp-service/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
