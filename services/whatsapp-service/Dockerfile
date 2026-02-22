# Build stage
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY libs/framework-common libs/framework-common
COPY services/whatsapp-service services/whatsapp-service
RUN mvn -f libs/framework-common/pom.xml install
RUN mvn -f services/whatsapp-service/pom.xml clean package -DskipTests

# Run stage
FROM openjdk:17-slim
COPY --from=build /app/services/whatsapp-service/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
