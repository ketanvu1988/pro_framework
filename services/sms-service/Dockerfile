# Build stage
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY libs/framework-common libs/framework-common
COPY services/sms-service services/sms-service
RUN mvn -f libs/framework-common/pom.xml install
RUN mvn -f services/sms-service/pom.xml clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre
COPY --from=build /app/services/sms-service/target/sms-service-1.0.0.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
