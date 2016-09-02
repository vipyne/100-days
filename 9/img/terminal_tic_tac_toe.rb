#!/usr/bin/env ruby

##############################
#                            #
#  # # # tic tac toe # # #   #
#                            #
# ruby script run in bash    #
# author github: vipyne      #
#                            #
##############################

class TicTacToe
  def initialize(player_X, player_O)
    # clear screen to normalize cooridnates
    system( "clear" )

    @player_X = player_X
    @player_O = player_O
    @current_mark = 'X'
    @current_player = @player_X
    @plays = 0
    @board_squares = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    @game_over = false
  end


  ##############################
  #### getters and setters #####
  ##############################
  def current_mark
    @current_mark
  end

  def current_mark=(mark)
    @current_mark = mark
  end

  def plays
    @plays
  end

  def plays=(turn)
    @plays = turn
  end

  def board_squares
    @board_squares
  end

  def board_squares=(mark)
    @board_squares = mark
  end

  def game_over
    @game_over
  end

  def game_over=(flag)
    @game_over = flag
  end

  def player_X
    @player_X
  end

  def player_X=(player)
    @player_X = player
  end

  def player_O
    @player_O
  end

  def player_O=(player)
    @player_O = player
  end

  def current_player
    @current_player
  end

  def current_player=(player)
    @current_player = player
  end


  ##############################
  #### view-y methods ##########
  ##############################
  # square_index: integer - index of sqare in board squares array
  def go_to_square_coordinates(square_index)
    case square_index
    when 0
      go_to_coordinates(0, 0)
    when 1
      go_to_coordinates(0, 4)
    when 2
      go_to_coordinates(0, 8)
    when 3
      go_to_coordinates(2, 0)
    when 4
      go_to_coordinates(2, 4)
    when 5
      go_to_coordinates(2, 8)
    when 6
      go_to_coordinates(4, 0)
    when 7
      go_to_coordinates(4, 4)
    when 8
      go_to_coordinates(4, 8)
    else
      go_to_coordinates(0, 0)
    end
  end

  def go_to_rest_coordinate
    go_to_coordinates(10, 0)
  end

  # y: integer - y cooridinate on bash terminal screen
  # x: integer - x cooridinate on bash terminal screen
  def go_to_coordinates(y, x)
    system("tput cup #{y} #{x}")
  end

  def initialize_board_view
    puts '1 | 2 | 3'
    puts '--+---+--'
    puts '4 | 5 | 6'
    puts '--+---+--'
    puts '7 | 8 | 9'
    puts
    puts "***   X: #{@player_X} vs. O: #{@player_O}"
    puts '***   type the number of the square'
    puts '***   you would like to play,'
    puts '***   then hit enter'
  end

  def display_directions
    puts '***   please enter the player\'s names to play tic tac toe '
    puts "***   example: $ #{$PROGRAM_NAME} <player-X-name> <player-O-name>"
  end

  def display_win
    go_to_coordinates(6, 0)

    # to make the background colors the same length, they need to have
    # the same number of characters.  since the current_player name is
    # varying, we determin it by subtracting it from the full width.
    display_width = 35
    spaces_minus_player = display_width - 13
    spaces_minus_first_line = display_width - 25
    spaces_minus_second_line = spaces_minus_player - @current_player.length

    puts "*" * display_width
    puts "***   three #{current_mark}s in a row !" + " " * spaces_minus_first_line
    puts "***   #{current_player} wins !" + " " * spaces_minus_second_line
    puts "*" * display_width
  end

  # current_player: string - name of player who's turn it currently is
  def display_current_player(current_player)
    # x coordianate of O player
    o_player_name_coordinate = @player_X.length + 14

    # if game over, don't update players next turn
    unless @game_over
      if @current_mark == 'X'
        go_to_coordinates(6, 6)
        system("printf \"\x1b[#{@plays % 2}3;4#{@plays % 2};1#{@plays % 2}4m#{@current_mark}: #{@current_player}\"")
        go_to_coordinates(6, o_player_name_coordinate)
        system("printf \"\x1b[0;0;14mO: #{@player_O}\"")
      else
        go_to_coordinates(6, 6)
        system("printf \"\x1b[0;0;14mX: #{@player_X}\"")
        go_to_coordinates(6, o_player_name_coordinate)
        system("printf \"\x1b[#{@plays % 2}3;4#{@plays % 2};1#{@plays % 2}4m#{@current_mark}: #{@current_player}\"")
      end
      return
    end
    # if stalemate, unhighlight both players
    if plays >= 9
      go_to_coordinates(6, 6)
      system("printf \"\x1b[0;0;14mX: #{@player_X}\"")
      go_to_coordinates(6, o_player_name_coordinate)
      system("printf \"\x1b[0;0;14mO: #{@player_O}\"")
    end
  end

  # win: boolean - determines whether to change one square or all winning squares
  def display_square_change(win = false)
    if win
      # background color is the same as winner's color
      # and text blinks!
      system("printf \"\x1b[1;5;132m#{@current_mark}\"")
    else
      # `plays % 2` always results in 0 or 1
      # X interpolates to "\x1b[03;40;104mX\"
      # O interpolates to "\x1b[13;41;114mO\"
      system("printf \"\x1b[#{@plays % 2}3;4#{@plays % 2};1#{@plays % 2}4m#{@current_mark}\"")
    end
  end

  def display_stalemate
    puts "***   awe shucks, this game ended in a stalemate"
  end


  ##############################
  #### game logic ##############
  ##############################
  def check_for_win
    winning_squares = []

    if @board_squares[0] == @board_squares[1] && @board_squares[1] == @board_squares[2]
      winning_squares = [0, 1, 2]
    end
    if @board_squares[3] == @board_squares[4] && @board_squares[4] == @board_squares[5]
      winning_squares = [3, 4, 5]
    end
    if @board_squares[6] == @board_squares[7] && @board_squares[7] == @board_squares[8]
      winning_squares = [6, 7, 8]
    end

    if @board_squares[0] == @board_squares[3] && @board_squares[3] == @board_squares[6]
      winning_squares = [0, 3, 6]
    end
    if @board_squares[1] == @board_squares[4] && @board_squares[4] == @board_squares[7]
      winning_squares = [1, 4, 7]
    end
    if @board_squares[2] == @board_squares[5] && @board_squares[5] == @board_squares[8]
      winning_squares = [2, 5, 8]
    end

    if @board_squares[0] == @board_squares[4] && @board_squares[4] == @board_squares[8]
      winning_squares = [0, 4, 8]
    end
    if @board_squares[2] == @board_squares[4] && @board_squares[4] == @board_squares[6]
      winning_squares = [2, 4, 6]
    end

    winning_squares
  end

  # winning_squares: array - array of three winning square indexes
  def handle_win(winning_squares)
    go_to_square_coordinates(winning_squares[0])
    display_square_change(true)
    go_to_square_coordinates(winning_squares[1])
    display_square_change(true)
    go_to_square_coordinates(winning_squares[2])
    display_square_change(true)

    display_win

    go_to_rest_coordinate
    @game_over = true
  end

  def handle_stalemate
    go_to_rest_coordinate
    display_stalemate
  end

  # index: integer - index of square played
  def handle_square_play(index)
    display_square_change
    @board_squares[index] = @current_mark

    winning_squares = check_for_win

    if winning_squares.empty?
      @plays += 1
      if plays % 2 == 0
        @current_mark = 'X'
        @current_player = @player_X
      else
        @current_mark = 'O'
        @current_player = @player_O
      end
      display_current_player(@current_player)
    else
      handle_win(winning_squares)
    end

    go_to_rest_coordinate
  end

  def play
    keyboard_input = []
    display_current_player(@current_player)
    go_to_rest_coordinate

    while true
      if @game_over
        break
      end

      if plays >= 9
        handle_stalemate
        @game_over = true
        display_current_player(@current_player)
        go_to_coordinates(11, 0)
        break
      end

      keyboard_input.push(STDIN.gets.chomp.to_i)

      @board_squares.each do |square_index|
        if keyboard_input.last.class == Fixnum && keyboard_input.last == square_index && @board_squares.include?(square_index)
          go_to_square_coordinates(square_index - 1)
          self.handle_square_play(square_index - 1)
        end
      end
      go_to_rest_coordinate
    end
  end

  def valid_game_params
    if @player_X && @player_O
      initialize_board_view
      true
    else
      display_directions
    end
  end

end

tic_tac_toe = TicTacToe.new(ARGV[0], ARGV[1])
if tic_tac_toe.valid_game_params
  tic_tac_toe.play
end