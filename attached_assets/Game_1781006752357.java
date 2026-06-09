import java.util.Scanner;

public class Game {

  public static void main(String[] args) {

      Scanner madlibs = new Scanner (System.in);

      System.out.print("Enter an adjective ");
      String adjective = madlibs.nextLine();

      System.out.print("Enter a name ");
      String name = madlibs.nextLine();

      System.out.print("Enter a past verb ");
      String verb = madlibs.nextLine();

      System.out.print("Enter a name ");
      String secondName = madlibs.nextLine();

      System.out.println("Enter a name ");
      String thirdName = madlibs.nextLine();


      System.out.println("I am very " + adjective +  " today");
      System.out.println("I saw " + name + " yesterday");
      System.out.println("A little while ago i " + verb + " to " + secondName );
      System.out.println( thirdName + " is very funny just like you ");

      madlibs.close();
    }

}