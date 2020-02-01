require 'test_helper'

class CandidatesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @candidate = candidates(:one)
  end

  test "should get index" do
    get candidates_url, as: :json
    assert_response :success
  end

  test "should create candidate" do
    assert_difference('Candidate.count') do
      post candidates_url, params: { candidate: { april: @candidate.april, august: @candidate.august, december: @candidate.december, february: @candidate.february, january: @candidate.january, july: @candidate.july, june: @candidate.june, march: @candidate.march, may: @candidate.may, name: @candidate.name, november: @candidate.november, october: @candidate.october, september: @candidate.september } }, as: :json
    end

    assert_response 201
  end

  test "should show candidate" do
    get candidate_url(@candidate), as: :json
    assert_response :success
  end

  test "should update candidate" do
    patch candidate_url(@candidate), params: { candidate: { april: @candidate.april, august: @candidate.august, december: @candidate.december, february: @candidate.february, january: @candidate.january, july: @candidate.july, june: @candidate.june, march: @candidate.march, may: @candidate.may, name: @candidate.name, november: @candidate.november, october: @candidate.october, september: @candidate.september } }, as: :json
    assert_response 200
  end

  test "should destroy candidate" do
    assert_difference('Candidate.count', -1) do
      delete candidate_url(@candidate), as: :json
    end

    assert_response 204
  end
end
