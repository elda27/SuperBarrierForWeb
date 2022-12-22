#include <M5Atom.h>
// #include <SPI.h>
#include <TinyGPS++.h>
#include <BLEServer.h>
#include <BLEDevice.h>
#include <BLEService.h>

// #include "GPSAnalyse.h"

// GPSAnalyse GPS;
TinyGPSPlus gps;

#define ACC_SERVICE_UUID "b1ea00ed-3b42-4f3e-8aee-f772a3b5d726"
#define ACC_X_CHARACTERISTIC_UUID "a76d6c6c-d397-4f1b-b79e-494e45e06cab"
#define ACC_Y_CHARACTERISTIC_UUID "133457b2-8a8a-4e93-9ee0-7f2c4c91cffb"
#define ACC_Z_CHARACTERISTIC_UUID "0c18438d-a513-4b26-b0c2-ae776556f3ce"
#define GNSS_SERVICE_UUID "fa1d535e-ce61-4743-b1ca-e26e8c0828a6"
#define GNSS_LNG_CHARACTERISTIC_UUID "3589fda9-b9e6-455d-b479-2d009d80ed10"
#define GNSS_LAT_CHARACTERISTIC_UUID "57c47665-bacb-447a-bb4e-314419bb1843"
#define GNSS_SEA_LEVEL_CHARACTERISTIC_UUID "21782097-f808-443c-8856-cf50ddf24a67"

BLECharacteristic* acc_characteristics[3] = {};
BLECharacteristic* gnss_characteristics[3] = {};

void setup() {
  M5.begin(true, false, true);
  M5.dis.fillpix(0xff0000);
  // Init IMU
  if (M5.IMU.Init() != 0) {
    printf("IMU Sensor available.\r\n");
  }

  // Init SPI
  //SPI.begin(SPI_SCLK,SPI_MISO,SPI_MOSI,SPI_SS);
  // SPI.begin(23, 33, 19, -1);

  // Init GPS
  Serial1.begin(9600, SERIAL_8N1, 22, -1);

  // Init BLE
  setupBLEPeripheral();

  // Finished to initialization
  smartDelay(50);
  M5.dis.fillpix(0x0000ff);
}

void setupBLEPeripheral() {
  BLEDevice::init("super-barrier");
  BLEServer* server = BLEDevice::createServer();
  BLEAdvertising* pAdvertising = server->getAdvertising();

  // Setup accelelartion sensor
  BLEService* acc_service = server->createService(ACC_SERVICE_UUID);
  acc_characteristics[0] = acc_service->createCharacteristic(
    ACC_X_CHARACTERISTIC_UUID,
    BLECharacteristic::PROPERTY_READ
    // | BLECharacteristic::PROPERTY_WRITE
    | BLECharacteristic::PROPERTY_NOTIFY
    | BLECharacteristic::PROPERTY_INDICATE
  );
  acc_characteristics[1] = acc_service->createCharacteristic(
    ACC_Y_CHARACTERISTIC_UUID,
    BLECharacteristic::PROPERTY_READ
    // | BLECharacteristic::PROPERTY_WRITE
    | BLECharacteristic::PROPERTY_NOTIFY
    | BLECharacteristic::PROPERTY_INDICATE
  );
  acc_characteristics[2] = acc_service->createCharacteristic(
    ACC_Z_CHARACTERISTIC_UUID,
    BLECharacteristic::PROPERTY_READ
    // | BLECharacteristic::PROPERTY_WRITE
    | BLECharacteristic::PROPERTY_NOTIFY
    | BLECharacteristic::PROPERTY_INDICATE
  );

  // Setup GNSS sensor
  BLEService* gnss_service = server->createService(GNSS_SERVICE_UUID);
  gnss_characteristics[0] = gnss_service->createCharacteristic(
    GNSS_LAT_CHARACTERISTIC_UUID,
    BLECharacteristic::PROPERTY_READ
    // | BLECharacteristic::PROPERTY_WRITE
    | BLECharacteristic::PROPERTY_NOTIFY
    | BLECharacteristic::PROPERTY_INDICATE
  );
  gnss_characteristics[1] = gnss_service->createCharacteristic(
    GNSS_LNG_CHARACTERISTIC_UUID,
    BLECharacteristic::PROPERTY_READ
    // | BLECharacteristic::PROPERTY_WRITE
    | BLECharacteristic::PROPERTY_NOTIFY
    | BLECharacteristic::PROPERTY_INDICATE
  );
  gnss_characteristics[2] = gnss_service->createCharacteristic(
    GNSS_SEA_LEVEL_CHARACTERISTIC_UUID,
    BLECharacteristic::PROPERTY_READ
    // | BLECharacteristic::PROPERTY_WRITE
    | BLECharacteristic::PROPERTY_NOTIFY
    | BLECharacteristic::PROPERTY_INDICATE
  );
  
  acc_service->start();
  gnss_service->start();
  pAdvertising->start();
}

static void smartDelay(unsigned long ms) {
  unsigned long start = millis();
  size_t decoded = 0;
  bool stop = false;
  do {
    M5.update();
    while (!stop && Serial1.available() > 0) {
      char c = Serial1.read();
      Serial.write(c);
      decoded += 1;
      if (gps.encode(c)) {
        stop = true;
        break;
      }
    }
    delay(1);
  } while ((millis() - start < ms) && !stop);
  Serial.printf("\r\n### GPS decoded %d bytes, stop: %d\r\n", decoded, stop);
  // delay(ms - millis() - start);
}

void loop() {
  // Update acceleration sensor
  float accX = 0.0f, accY = 0.0f, accZ = 0.0f;
  M5.IMU.getAccelData(&accX, &accY, &accZ);
  acc_characteristics[0]->setValue(accX);
  acc_characteristics[1]->setValue(accY);
  acc_characteristics[2]->setValue(accZ);
  for (int i = 0; i < 3; ++i) {
    acc_characteristics[i]->notify();
  }
  Serial.printf("Acc: %.2f,%.2f,%.2f mg\r\n", accX * 1000, accY * 1000, accZ * 1000);

  // Update GPS
  // GPS.upDate();

  if (gps.location.isValid()) {
    float lat = gps.location.lat();
    float lng = gps.location.lng();
    float sea_level = 0.0f;
    gnss_characteristics[0]->setValue(lat);
    gnss_characteristics[1]->setValue(lng);
    gnss_characteristics[2]->setValue(sea_level);
    for (int i = 0; i < 3; ++i) {
      gnss_characteristics[i]->notify();
    }
    Serial.printf("GPS location: %.5f,%.5f\r\n", lat, lng);
  } else {
    Serial.printf("GPS location: ###INVALID###\r\n");
    Serial.printf(
      "     Processed:%d, Fix: %d, Checksum:%d\r\n",
      gps.charsProcessed(),
      gps.sentencesWithFix(),
      gps.failedChecksum()
    );
  }


  if (gps.time.isValid()) {
    Serial.print("GPS time: ");
    if (gps.time.hour() < 10) Serial.print("0");
    Serial.print(gps.time.hour());
    Serial.print(":");
    if (gps.time.minute() < 10) Serial.print("0");
    Serial.print(gps.time.minute());
    Serial.print(":");
    if (gps.time.second() < 10) Serial.print("0");
    Serial.print(gps.time.second());
    Serial.print(".");
    if (gps.time.centisecond() < 10) Serial.print("0");
    Serial.print(gps.time.centisecond());
    Serial.print("\n");
  } else {
    Serial.print("GPS time: ###INVALID###\r\n");
    Serial.printf(
      "     Processed:%d, Fix: %d, Checksum:%d\r\n",
      gps.charsProcessed(),
      gps.sentencesWithFix(),
      gps.failedChecksum());
  }

  smartDelay(100);
}
