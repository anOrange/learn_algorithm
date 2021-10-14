
#include <stdio.h>
// #include<io.h>
#include <fcntl.h>
#include <stdlib.h>
#include <time.h>

int calcCount(int start, unsigned long chunkLen);


int main()
{

  calcCount(0, 90000000L);
  // 最后要计算连接处
  return 0;
}


int calcCount(int start, unsigned long chunkLen) {
  clock_t startTime = clock();
  double diff_time;
  clock_t end;

  int len = 0;
  int count = 0;
  unsigned char *ansA = "HELLO JD";
  unsigned char *ansB = "JD WORLD";
  u_int64_t p1 = *(u_int64_t *)ansA;
  u_int64_t p2 = *(u_int64_t *)ansB;
  
  // HELLO JD WORLD
  
  int fd = open("./res_unsync/demo_200_499921.txt", O_RDONLY);
  if (fd == -1)
  {
    printf("can not open the file\n");
    return 0;
  }
  const BuffSize = 5120000;
  unsigned char buf[BuffSize] = {"\0"};
  lseek(fd, start, SEEK_SET);
  u_int64_t a = 0;
  u_int64_t b = 0;

  unsigned long readSize = 0;
  // printf("chunkLen=%ld, readSize=%ld\n", chunkLen, readSize);
  while ((len = read(fd, buf, BuffSize + readSize > chunkLen ? chunkLen - readSize : BuffSize)) && readSize < chunkLen)
  {
    // printf("readSize: %ld\n", readSize);
    
    readSize += len;
    len = len - 13;
    for (int i = 0; i < len; i++) {
      if (*(buf + i + 13) > 'W') {
        i += 13;
        continue;
      }
      if (*(u_int64_t *)(buf + i) == p1 && *(u_int64_t *)(buf + i + 6) == p2) {
        count++;
        i += 13;
      }
      
      // a = *(u_int64_t *)(buf + i);
      // b = *(u_int64_t *)(buf + i + 6);
      // if (a == p1 && b == p2) {
      //   count++;
      //   i += 13;
      // }
      // else if ((b >> 56) > 'W')
      // {
      //   i += 13;
      //   // printf("+13: $d %c\n", (b >> 56), (b >> 56));
      // }
      
    } 
    
  }
  close(fd);

  printf("worldCount=%d\n", count);

  end = clock();
  diff_time = (double)((end - startTime) / 1000);

  printf("start=%d, 用时:%f \n", start, diff_time);
  return count;
}


