define ["models/player", "core/util", "underscore", "./templates"], (Player, Util, _, templates) ->
  class SpeakerRank
    constructor: (@ui) ->
    sidebarCategory: -> 'Statistics'
    sidebarItem: ->
      name: 'Speaker rank'
      sortToken: 2
    route: -> '/speaker-rank'
    routeOpts: ->
      ui = @ui
      result =
        template: templates.view()
        controller: [ '$scope', ($scope) ->
          baseRoundIds = ->
            tournament = ui.tournament
            rf = tournament.rankFromSpeakers
            objs = {}
            if rf.all
              for round in tournament.rounds
                if round.paired
                  objs[round.id] = true
            else
              for round in tournament.rounds
                if round.paired and rf[round.id]
                  objs[round.id] = true
            return objs

          baseRounds = (ids) ->
            r = []
            ids ?= baseRoundIds()
            for round in ui.tournament.rounds
              if ids[round.id]
                r.push round
            return r

          $scope.formatBreakdown = (breakdown) ->
            breakdown = _.map breakdown, (score) ->
              if not score?
                '-'
              else
                score.toFixed(Util.decimalsOf(score, 2))
            breakdown.join(' ')

          $scope.refreshDecimals = ->
            players = $scope.players
            if not players? then return

            maxScoreDec = 0
            maxReplyDec = 0
            maxHighLowDec = 0
            showTotals = ui.tournament.speakerRankShowTotals
            for player in players
              scoreDec = Util.decimalsOf (if showTotals then player.stats.rawScore else player.stats.score), 2
              highLowDec = Util.decimalsOf (if showTotals then player.stats.rawHighLow else player.stats.scoreHighLow), 2
              replyDec = Util.decimalsOf player.stats.reply, 2
              maxScoreDec = scoreDec if scoreDec > maxScoreDec
              maxReplyDec = replyDec if replyDec > maxReplyDec
              maxHighLowDec = highLowDec if highLowDec > maxHighLowDec

            $scope.scoreDec = maxScoreDec
            $scope.replyDec = maxReplyDec
            $scope.highLowDec = maxHighLowDec


          $scope.refreshStats = (rounds) ->
            tournament = ui.tournament
            players = $scope.players = tournament.players.slice(0)
            rounds ?= baseRounds()
            Player.calculateStats players, rounds
            sorter = tournament.speakerRankSorter.boundComparator()
            players.sort (a,b) ->
              aout = a.stats.roundsPlayed < tournament.minPlayed
              ain = b.stats.roundsPlayed < tournament.minPlayed
              if ain == aout
                return sorter a.stats, b.stats
              if ain
                return -1
              return 1
            $scope.refreshDecimals()


          roundIds = null
          Util.installScopeUtils $scope

          $scope.$watch (-> ui.tournament.speakerRankShowTotals), (v) ->
            $scope.refreshDecimals()

          $scope.$watch (-> JSON.stringify roundIds = baseRoundIds()), (v) ->
            $scope.refreshStats baseRounds roundIds
        ]
