
#include <stdio.h>
// #include<io.h>
#include <fcntl.h>
#include <stdlib.h>
#include <stdlib.h>
#include <pthread.h>
#include <time.h>

void *calcCount(void *args);
// int calcCount(int start, unsigned long chunkLen);
int sharedi = 0;
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;


int main()
{

  int ret;
  pthread_t thrds[20];
  pthread_mutex_init(&mutex, NULL);

  
  clock_t startTime = clock();
  double diff_time;
  clock_t end;


  int thrdCount = 0;
  unsigned char **p;
  unsigned int *p2;
  const unsigned int chunkSize = 20000000;
  for (int i = 0; i < 5; i++)
  {
    unsigned int* param = malloc(sizeof(unsigned int) * 2);
    param[0] = i * chunkSize;
    param[1] = chunkSize;
    ret = pthread_create(thrds + thrdCount++, NULL, (void *)calcCount, param);
  }  
  
  for (int i = 0; i < thrdCount; i++) {
    pthread_join(thrds[i], NULL);
  }

  // 最后要计算连接处是否有 HELLO JD WORLD

  printf("sharedi = %d\n", sharedi);

  end = clock();
  diff_time = (double)((end - startTime) / 1000);

  printf("总用时:%f , count=%d\n", diff_time, sharedi);

  return 0;
}


void *calcCount(void *args) {

  clock_t startTime = clock();
  double diff_time;
  clock_t end;

  unsigned int start = *(unsigned int *)args;
  unsigned int chunkSize = *((unsigned int *)args + 1);
  // printf("start=%d, chunkSize:%d\n", start, chunkSize);


  int count = 0;
  unsigned char *ansA = "HELLO JD";
  unsigned char *ansB = "JD WORLD";
  u_int64_t p1 = *(u_int64_t *)ansA;
  u_int64_t p2 = *(u_int64_t *)ansB;
  
  // // HELLO JD WORLD
  
  int fd = open("./res_unsync/demo_200_499921.txt", O_RDONLY);
  if (fd == -1)
  {
    printf("can not open the file\n");
  }
  lseek(fd, start, SEEK_SET);

  const BuffSize = 512000;
  unsigned char buf[BuffSize] = {"\0"};
  unsigned long readSize = 0;
  int len = 0;
  // printf("chunkLen=%ld, readSize=%ld\n", chunkLen, readSize);
  // while (len = read(fd, buf, BuffSize))
  while ((len = read(fd, buf, BuffSize + readSize > chunkSize ? chunkSize - readSize : BuffSize)) && readSize < chunkSize)
  {
    // printf("%s\nlen=%d\n", buf, len);
    // printf("readSize: %ld\n", readSize);
    
    readSize += len;
    len = len - 13;
    for (int i = 0; i < len; i++) {
      if (*(buf + i + 13) > 'W') {
        i += 13;
        continue;
      }
      if (*(u_int64_t *)(buf + i) == p1 && *(u_int64_t *)(buf + i + 6) == p2) {
        // printf("%s\n i=%d\n", (buf + i), i);
        count++;
        i += 13;
      }
    }
    
  }
  close(fd);

  end = clock();
  diff_time = (double)((end - startTime) / 1000);
  printf("start=%d, 用时:%f , count=%d\n", start, diff_time, count);

  pthread_mutex_lock(&mutex);
  sharedi += count;
  pthread_mutex_unlock(&mutex);
}


