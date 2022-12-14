/**
 * MIT License
 * 
 * Copyright (c) 2021 John Hildenbiddle
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
#ifndef _GPSANALYSE_H_
#define _GPSANALYSE_H_

#include <Arduino.h>
#include "utility/Task.h"
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>

//#define DEBUG_GPS

typedef struct GNRMC
{
    String pamstr[13];  
    String Utc;         //1
    char State;         //2
    double Latitude;    //3
    char  LatitudeMark;  //4
    double Longitude;   //5
    char LongitudeMark;  //6
    float TrackSpeed;   //7
    float TrackAngle;   //8
    String Date;        //9
    float Magnetic;     //10
    char Declination;    //11
    int mode;           //12
    String Sum;
}GNRMC_t;


typedef struct GNGSA
{
    String pamstr[50];
    char mode2;
    int mode1;
    int PINMap[12];
    float PDOP;
    float HDOP;
    float VDOP;
    String Sum;

}GNGSA_t;

typedef struct GPSSatellite
{
    bool flag;
    int id;
    int elevation;
    int Azimuth;
    int SNR;
}GPSSatellite_t;

typedef struct GPGSV
{
    String pamstr[128];
    int size;
    int Number;
    int SatelliteSize;
    GPSSatellite_t Satellite[32];
    String sum;
}GPGSV_t;

/*
typedef struct GPGGA
{
}GPGGA_t;
typedef struct GPGGA
{
}GPGGA_t;
typedef struct GPGLL
{
}GPGLL_t;
*/

class GPSAnalyse : public Task
{
private:
    
    /* data */
    String _GPS_Str;
    HardwareSerial *_serial;
    SemaphoreHandle_t _xSemaphore = NULL;
    char *GPSReadBuff;

    void Analyse();

    void AnaGPRMC(String str);
    void AnaGNGAS(String str);
    void AnaGPGSV(String str);

    void run(void *data);

    GNRMC_t _s_GNRMC;
    GNGSA_t _s_GNGAS;
    GPGSV_t _s_GPGSV;

public:
    GPSAnalyse();
    ~GPSAnalyse();
    void setSerialPtr(HardwareSerial &serial);
    void upDate();


    GNRMC_t s_GNRMC;
    GNGSA_t s_GNGAS;
    GPGSV_t s_GPGSV;
};






#endif