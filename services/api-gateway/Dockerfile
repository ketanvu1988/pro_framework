# Build stage
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY libs/framework-common libs/framework-common
COPY services/api-gateway services/api-gateway
RUN mvn -f libs/framework-common/pom.xml install
RUN mvn -f services/api-gateway/pom.xml clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre
COPY --from=build /app/services/api-gateway/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
